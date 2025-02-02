import { ApiCaller } from "../api";
import type { WidgetConfig } from "../types/WidgetConfig";
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
  private poller = new Poller();

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
  }: { config: WidgetConfig; api: ApiCaller; sessionCtx: SessionCtx }) {
    this.config = config;
    this.api = api;
    this.sessionCtx = sessionCtx;

    this.registerPolling();
  }

  reset = () => {
    this.sendMessageAbortController.abort("Resetting chat");
    this.state.reset();
    // The poller should automatically reset, since we're subscribed to the session state, and whenever it's null, the poller resets... but just in case, let's reset it here as well
    this.poller.reset();
  };

  private registerPolling = () => {
    this.sessionCtx.sessionState.subscribe(({ session }) => {
      if (session?.id) {
        this.poller.startPolling(async (abortSignal) => {
          await this.fetchAndSetHistory(session.id, abortSignal);
        }, 1000);
      } else {
        this.poller.reset();
      }
    });
  };

  sendMessage = async (
    input: SomeOptional<
      SafeOmit<SendMessageDto, "bot_token" | "uuid">,
      "session_id" | "user"
    >,
  ): Promise<void> => {
    this.sendMessageAbortController = new AbortController();
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
        input.content,
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

  private fetchAndSetHistory = async (
    sessionId: string,
    abortSignal: AbortSignal,
  ): Promise<void> => {
    /**
     * This is a bit of an implicit contract... there are two cases here
     * 1. If there are no messages in state, it means the user selected a previous session from the sessions screen and got routed to the chat,
     *    in this case, we want to show a loading indicator until the initial fetch is done
     * 2. There is a single message in state, which is the optimistically rendered user message,
     *    in this case, we don't want to show a loading indicator
     */
    if (this.state.get().messages.length === 0) {
      this.state.setPartial({ isInitialFetchLoading: true });
    }

    const lastMessageTimestamp = this.state.get().messages.at(-1)?.timestamp;

    const { data: response } = await this.api.getSessionHistory({
      sessionId,
      lastMessageTimestamp,
      abortSignal,
    });

    if (response && response.length > 0) {
      // Get a fresh reference to current messages after the poll is done
      const prevMessages = this.state.get().messages;
      const newMessages = response
        .map(this.mapHistoryToMessage)
        .filter(
          (newMsg) =>
            !prevMessages.some((existingMsg) => existingMsg.id === newMsg.id),
        );
      this.state.setPartial({
        messages: [...prevMessages, ...newMessages],
      });
    }

    if (this.state.get().isInitialFetchLoading) {
      this.state.setPartial({ isInitialFetchLoading: false });
    }
  };

  /** Not the best name but whatever */
  private mapHistoryToMessage = (history: MessageDto): MessageType => {
    const commonFields = {
      id: history.publicId,
      timestamp: history.sentAt || "",
      attachments: history.attachments || undefined,
    };

    if (history.sender.kind === "user") {
      return {
        ...commonFields,
        type: "FROM_USER",
        content: history.content.text || "",
        deliveredAt: history.sentAt || "",
      };
    }

    if (history.sender.kind === "agent") {
      return {
        ...commonFields,
        type: "FROM_AGENT",
        component: "agent_message",
        data: {
          message: history.content.text || "",
        },
        agent: {
          name: history.sender.name || "",
          avatar: history.sender.avatar || "",
          id: null,
          isAi: false,
        },
      };
    }

    const action = history.actionCalls?.at(-1);
    return {
      ...commonFields,
      type: "FROM_BOT",
      component: "bot_message",
      agent: {
        id: null,
        name: this.config.bot?.name || "",
        isAi: true,
        avatar: this.config.bot?.avatar || "",
      },
      data: {
        message: history.content.text || "",
        action: action
          ? { name: action.actionName, data: action.result }
          : undefined,
      },
    };
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
