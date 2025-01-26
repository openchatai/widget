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

export class MessageCtx {
  private config: WidgetConfig;
  private api: ApiCaller;
  private sessionCtx: SessionCtx;
  private poller = new Poller();

  public state = new PrimitiveState<{
    messages: MessageType[];
    isSendingMessage: boolean;
    suggestedReplies: string[] | null;
  }>({
    messages: [],
    isSendingMessage: false,
    suggestedReplies: null,
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
    if (isSending && isAssignedToAI) {
      console.warn("Cannot send messages while awaiting AI response");
      return;
    }

    /* ------------------------------------------------------ */
    /*                 Clear suggested replies                */
    /* ------------------------------------------------------ */
    this.state.setPartial({ suggestedReplies: null });

    try {
      this.state.setPartial({ isSendingMessage: true });
      /* ------------------------------------------------------ */
      /*     Optimistically add message to rendered messages    */
      /* ------------------------------------------------------ */
      const userMessage = MessageCtx.toUserMessage(
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
        const botMessage = MessageCtx.toBotMessage(data);
        if (botMessage) {
          const prevMessages = this.state.get().messages;
          const shouldAppend = !prevMessages.some(
            (m) => m.id === botMessage.id,
          );
          if (!shouldAppend) return;
          this.state.setPartial({ messages: [...prevMessages, botMessage] });
        } else {
          /* ------------------------------------------------------ */
          /*      Check if bot responded with suggested replies     */
          /* ------------------------------------------------------ */
          if (data.options?.value && data.options?.value.length > 0) {
            this.state.setPartial({ suggestedReplies: data.options.value });
          }
        }
      } else {
        const errorMessage = MessageCtx.toErrorMessage(
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
        .map(MessageCtx.mapHistoryToMessage)
        .filter(
          (newMsg) =>
            !prevMessages.some((existingMsg) => existingMsg.id === newMsg.id),
        );
      this.state.setPartial({
        messages: [...prevMessages, ...newMessages],
      });

      // if (newMessages.length > 0) {
      //   // const playSoundEffects = config?.settings?.playSoundEffects;
      //   // Play notification sound for new messages if enabled
      //   // if (
      //   //   playSoundEffects &&
      //   //   platform?.audio &&
      //   //   isAudioAvailable(platform.audio)
      //   // ) {
      //   //   const botMessages = newMessages.filter(
      //   //     (msg) => msg.type === "FROM_BOT",
      //   //   );
      //   //   if (botMessages.length > 0) {
      //   //     await safeAudioOperation(
      //   //       () => platform.audio!.playNotification(),
      //   //       "Failed to play notification sound for new messages",
      //   //     );
      //   //   }
      //   // }

      // }
    }
  };

  /** Not the best name but whatever */
  private static mapHistoryToMessage(history: MessageDto): MessageType {
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
      };
    }

    return {
      ...commonFields,
      type: "FROM_BOT",
      component: "bot_message",
      agent: {
        id: null,
        name: history.sender.name || "",
        isAi: history.sender.kind === "ai",
        avatar: history.sender.avatar || null,
      },
      data: {
        message: history.content.text,
      },
    };
  }

  private static toUserMessage(
    content: string,
    attachments?: MessageAttachmentType[],
  ): UserMessageType {
    return {
      id: genUuid(),
      type: "FROM_USER",
      content,
      deliveredAt: new Date().toISOString(),
      attachments,
      timestamp: new Date().toISOString(),
    };
  }

  private static toBotMessage(response: SendMessageOutputDto): BotMessageType | null {
    if (response.success && response.autopilotResponse) {
      return {
        type: "FROM_BOT",
        id: response.autopilotResponse.id || genUuid(),
        timestamp: new Date().toISOString(),
        component: "bot_message",
        data: {
          message: response.autopilotResponse.value.content,
        },
      };
    }

    if (response.success && response.uiResponse) {
      const uiVal = response.uiResponse.value;
      return {
        type: "FROM_BOT" as const,
        id: genUuid(),
        timestamp: new Date().toISOString(),
        component: uiVal.name,
        data: uiVal.request_response,
      };
    }

    return null;
  }

  private static toErrorMessage(message: string) {
    return {
      type: "FROM_BOT" as const,
      id: genUuid(),
      timestamp: new Date().toISOString(),
      component: "TEXT",
      data: {
        message,
        variant: "error",
      },
    };
  }
}
