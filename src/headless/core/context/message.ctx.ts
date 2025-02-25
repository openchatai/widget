import { ApiCaller } from "../api/api-caller";
import type { WidgetConfig } from "../types/widget-config";
import type { SafeOmit, SomeOptional } from "../types/helpers";
import type {
  BotMessageType,
  MessageType,
  UserMessageType,
} from "../types/messages";
import type {
  MessageAttachmentType,
  MessageDto,
  SendMessageDto,
  SendMessageOutputDto,
} from "../types/schemas";
import { Poller } from "../utils/Poller";
import { PrimitiveState } from "../utils/PrimitiveState";
import { genUuid } from "../utils/uuid";
import { SessionCtx } from "./session.ctx";

type MessageCtxState = {
  messages: MessageType[];
  isSendingMessage: boolean;
  lastAIResMightSolveUserIssue: boolean;
  isInitialFetchLoading: boolean;
};

export class MessageCtx {
  private config: WidgetConfig;
  private api: ApiCaller;
  private sessionCtx: SessionCtx;

  public state = new PrimitiveState<MessageCtxState>({
    messages: [],
    isSendingMessage: false,
    lastAIResMightSolveUserIssue: false,
    isInitialFetchLoading: false,
  });

  private sendMessageAbortController = new AbortController();

  constructor({
    config,
    api,
    sessionCtx,
  }: {
    config: WidgetConfig;
    api: ApiCaller;
    sessionCtx: SessionCtx;
  }) {
    this.config = config;
    this.api = api;
    this.sessionCtx = sessionCtx;
  }

  reset = () => {
    this.sendMessageAbortController.abort("Resetting chat");
    this.state.reset();
  };

  sendMessage = async (
    input: SomeOptional<
      SafeOmit<SendMessageDto, "bot_token" | "uuid">,
      "session_id" | "user"
    >,
  ): Promise<void> => {
    /* ------------------------------------------------------ */
    /*         Prevent sending if there is no content         */
    /* ------------------------------------------------------ */
    if (
      !input.content.trim() &&
      (!input.attachments || input.attachments.length === 0)
    ) {
      console.warn("Cannot send an empty message of no content or attachments");
      return;
    }
    /* ------------------------------------------------------ */
    /*        Prevent sending while waiting for AI res        */
    /* ------------------------------------------------------ */
    const isSending = this.state.get().isSendingMessage;
    const isAssignedToAI =
      this.sessionCtx.sessionState.get().session?.assignee.kind === "ai";
    const lastMessage = this.state.get().messages.at(-1);
    if (
      (isAssignedToAI && isSending) ||
      // If last message is from user, then bot response did not arrive yet
      (isAssignedToAI && lastMessage?.type === "FROM_USER")
    ) {
      console.warn("Cannot send messages while awaiting AI response");
      return;
    }

    this.sendMessageAbortController = new AbortController();

    /* ------------------------------------------------------ */
    /*      Clear last AI response might solve user issue     */
    /* ------------------------------------------------------ */
    this.state.setPartial({ lastAIResMightSolveUserIssue: false });

    try {
      this.state.setPartial({ isSendingMessage: true });
      /* ------------------------------------------------------ */
      /*     Optimistically add message to rendered messages    */
      /* ------------------------------------------------------ */
      const userMessage = this.toUserMessage(
        input.content.trim(),
        input.attachments || undefined,
      );
      const currentMessages = this.state.get().messages;
      this.state.setPartial({
        messages: [...currentMessages, userMessage],
      });

      /* ------------------------------------------------------ */
      /*              Create session if not exists              */
      /* ------------------------------------------------------ */
      if (!this.sessionCtx.sessionState.get().session?.id) {
        const createdSession = await this.sessionCtx.createSession();

        // TODO: apply some retry logic here
        if (!createdSession) {
          console.error("Failed to create session");
          return;
        }

        // Refresh sessions list instantly to get the newly created session in the sessions list
        void this.sessionCtx.refreshSessions();
      }
      const sessionId = this.sessionCtx.sessionState.get().session?.id;
      if (!sessionId) return;
      /* ------------------------------------------------------ */
      /*             Send and wait for bot response             */
      /* ------------------------------------------------------ */
      const { data } = await this.api.sendMessage(
        {
          uuid: userMessage.id,
          bot_token: this.config.token,
          headers: this.config.headers,
          query_params: this.config.queryParams,
          session_id: sessionId,
          user: this.config.user?.data,
          ...input,
        },
        this.sendMessageAbortController.signal,
      );

      if (data?.success) {
        /* ------------------------------------------------------ */
        /*      Append bot reply if not fetched from polling      */
        /* ------------------------------------------------------ */
        const botMessage = this.toBotMessage(data);
        if (botMessage) {
          const prevMessages = this.state.get().messages;
          const shouldAppend = !prevMessages.some(
            (m) => m.id === botMessage.id,
          );
          if (!shouldAppend) {
            this.state.setPartial({
              lastAIResMightSolveUserIssue:
                data.autopilotResponse?.mightSolveUserIssue ||
                data.uiResponse?.mightSolveUserIssue,
            });
            return;
          }
          this.state.setPartial({
            messages: [...prevMessages, botMessage],
            lastAIResMightSolveUserIssue:
              data.autopilotResponse?.mightSolveUserIssue ||
              data.uiResponse?.mightSolveUserIssue,
          });
        }
      } else {
        const errorMessage = this.toBotErrorMessage(
          data?.error?.message || "Unknown error occurred",
        );
        const currentMessages = this.state.get().messages;
        this.state.setPartial({
          messages: [...currentMessages, errorMessage],
        });
      }
    } catch (error) {
      if (!this.sendMessageAbortController.signal.aborted) {
        console.error("Failed to send message:", error);
      }
    } finally {
      this.state.setPartial({ isSendingMessage: false });
    }
  };

  private toUserMessage = (
    content: string,
    attachments?: MessageAttachmentType[],
  ): UserMessageType => {
    return {
      id: genUuid(),
      type: "FROM_USER",
      content,
      deliveredAt: new Date().toISOString(),
      attachments,
      timestamp: new Date().toISOString(),
    };
  };

  private toBotMessage = (
    response: SendMessageOutputDto,
  ): BotMessageType | null => {
    if (response.success && response.autopilotResponse) {
      return {
        type: "FROM_BOT",
        id: response.autopilotResponse.id || genUuid(),
        timestamp: new Date().toISOString(),
        component: "bot_message",
        agent: this.config.bot
          ? {
              name: this.config.bot.name || "",
              isAi: true,
              avatar: this.config.bot.avatar || "",
              id: null,
            }
          : undefined,
        data: {
          message: response.autopilotResponse.value.content,
          action: response.uiResponse?.value.name
            ? {
                name: response.uiResponse.value.name,
                data: response.uiResponse.value.request_response,
              }
            : undefined,
        },
      };
    }

    return null;
  };

  private toBotErrorMessage = (message: string): BotMessageType => {
    return {
      type: "FROM_BOT",
      id: genUuid(),
      timestamp: new Date().toISOString(),
      component: "TEXT",
      data: {
        message,
        variant: "error",
        action: undefined,
      },
    };
  };
}
