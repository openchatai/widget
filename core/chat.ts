import { PubSub } from "./PubSub";
import { ApiCaller } from "./api";
import { genUuid } from "./utils/genUuid";
import {
  ChatAttachmentType,
  HandleContactMessageOutputSchema,
  SendChatDto,
  WidgetSessionDto,
} from "./types/schemas";
import {
  LoadingState,
  ErrorState,
  SomeOptional,
  SafeOmit,
} from "./types/helpers";
import { createContactHandler } from "./contact";
import { WidgetConfig } from "core/types/WidgetConfig";
import { BotMessageType, MessageType, UserMessageType } from "./types";
import { mapHistoryToMessage } from "./utils/map-history-to-message";

// Constants
const POLLING_INTERVALS_MS = {
  SESSION: 1000,
  MESSAGES: 1000,
} as const;

// Types
export type PollingType = "session" | "messages";

export type PollingState = {
  isPolling: boolean;
  lastPollTime: string | null;
  nextPollTime: string | null;
  error: ErrorState;
};

export type PollingStates = {
  [K in PollingType]: PollingState;
};

export type ChatState = {
  messages: MessageType[];
  keyboard: { options: string[] } | null;
  loading: LoadingState;
  error: ErrorState;
  polling: PollingStates;
};

type ChatOptions = {
  api: ApiCaller;
  config: WidgetConfig;
  onSessionDestroy?: () => void;
};

// Message Handling
function createMessageHandler(
  api: ApiCaller,
  state: PubSub<ChatState>,
  config?: WidgetConfig,
) {
  async function fetchHistoryMessages(session: WidgetSessionDto) {
    const messages = state.getState().messages;
    const lastMessageTimestamp = state.getState().messages.at(-1)?.timestamp;

    const { data: response } = await api.getSessionHistory(
      session.id,
      lastMessageTimestamp,
    );

    if (response && response.length > 0) {
      const newMessages = response
        .map(mapHistoryToMessage)
        .filter(
          (newMsg) =>
            !messages.some((existingMsg) => existingMsg.id === newMsg.id),
        );

      if (newMessages.length > 0) {
        const playSoundEffects = config?.settings?.playSoundEffects;
        // Play notification sound for new messages if enabled
        // if (
        //   playSoundEffects &&
        //   platform?.audio &&
        //   isAudioAvailable(platform.audio)
        // ) {
        //   const botMessages = newMessages.filter(
        //     (msg) => msg.type === "FROM_BOT",
        //   );
        //   if (botMessages.length > 0) {
        //     await safeAudioOperation(
        //       () => platform.audio!.playNotification(),
        //       "Failed to play notification sound for new messages",
        //     );
        //   }
        // }

        state.setStatePartial({
          messages: [...messages, ...newMessages],
        });
      }
    }
  }

  function toUserMessage(
    content: string,
    attachments?: ChatAttachmentType[],
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

  function toBotMessage(
    response: HandleContactMessageOutputSchema,
  ): BotMessageType | null {
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

  function addErrorMessage(message: string) {
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

  return {
    fetchHistoryMessages,
    toUserMessage,
    toBotMessage,
    addErrorMessage,
  };
}

function createSessionManager(
  api: ApiCaller,
  sessionState: PubSub<WidgetSessionDto | null>,
  chatState: PubSub<ChatState>,
  messageHandler: ReturnType<typeof createMessageHandler>,
  onSessionDestroy?: () => void,
) {
  let stopPolling: (() => void) | null = null;

  /**
   * Starts polling for the session and messages
   */
  function startPolling() {
    if (stopPolling) return;

    const intervals: NodeJS.Timeout[] = [];

    // Poll session
    intervals.push(
      setInterval(async () => {
        const session = sessionState.getState();
        if (!session?.id) return;

        try {
          const now = new Date();
          chatState.setStatePartial({
            polling: {
              ...chatState.getState().polling,
              session: {
                isPolling: true,
                lastPollTime: now.toISOString(),
                nextPollTime: new Date(
                  now.getTime() + POLLING_INTERVALS_MS.SESSION,
                ).toISOString(),
                error: { hasError: false },
              },
            },
          });

          const { data } = await api.getSession(session.id);
          if (data) {
            sessionState.setState(data);
          }

          chatState.setStatePartial({
            polling: {
              ...chatState.getState().polling,
              session: {
                ...chatState.getState().polling.session,
                isPolling: false,
              },
            },
          });
        } catch (error) {
          chatState.setStatePartial({
            polling: {
              ...chatState.getState().polling,
              session: {
                ...chatState.getState().polling.session,
                isPolling: false,
                error: {
                  hasError: true,
                  message:
                    error instanceof Error
                      ? error.message
                      : "Failed to poll session",
                  code: "SESSION_POLLING_FAILED",
                },
              },
            },
          });
        }
      }, POLLING_INTERVALS_MS.SESSION),
    );

    // Poll messages
    intervals.push(
      setInterval(async () => {
        const session = sessionState.getState();
        if (!session?.id) return;
        try {
          const now = new Date();
          chatState.setStatePartial({
            polling: {
              ...chatState.getState().polling,
              messages: {
                isPolling: true,
                lastPollTime: now.toISOString(),
                nextPollTime: new Date(
                  now.getTime() + POLLING_INTERVALS_MS.MESSAGES,
                ).toISOString(),
                error: { hasError: false },
              },
            },
          });

          await messageHandler.fetchHistoryMessages(session);

          chatState.setStatePartial({
            polling: {
              ...chatState.getState().polling,
              messages: {
                ...chatState.getState().polling.messages,
                isPolling: false,
              },
            },
          });
        } catch (error) {
          chatState.setStatePartial({
            polling: {
              ...chatState.getState().polling,
              messages: {
                ...chatState.getState().polling.messages,
                isPolling: false,
                error: {
                  hasError: true,
                  message:
                    error instanceof Error
                      ? error.message
                      : "Failed to poll messages",
                  code: "MESSAGES_POLLING_FAILED",
                },
              },
            },
          });
        }
      }, POLLING_INTERVALS_MS.MESSAGES),
    );

    stopPolling = () => {
      intervals.forEach(clearInterval);
      // Reset polling states
      chatState.setStatePartial({
        polling: {
          session: {
            isPolling: false,
            lastPollTime: null,
            nextPollTime: null,
            error: { hasError: false },
          },
          messages: {
            isPolling: false,
            lastPollTime: null,
            nextPollTime: null,
            error: { hasError: false },
          },
        },
      });
    };
  }

  /**
   * Creates a new session
   * @returns The session
   */
  async function createSession() {
    chatState.setStatePartial({
      loading: { isLoading: true, reason: "creating_session" },
      error: { hasError: false },
    });

    const { data: session, error } = await api.createSession();
    if (session) {
      sessionState.setState(session);
      chatState.setStatePartial({
        loading: { isLoading: false, reason: null },
      });
      startPolling();
      return session;
    }

    const errorState = {
      hasError: true,
      message:
        error instanceof Error ? error.message : "Failed to create session",
      code: "SESSION_CREATION_FAILED" as const,
    };
    chatState.setStatePartial({
      error: errorState,
      loading: { isLoading: false, reason: null },
    });
    return null;
  }

  /**
   * Clears the session and stops polling
   */
  async function clearSession() {
    const session = sessionState.getState();
    if (!session?.id) return;

    try {
      if (stopPolling) {
        stopPolling();
        stopPolling = null;
      }
      sessionState.setState(null);

      chatState.setState({
        messages: [],
        keyboard: null,
        loading: { isLoading: false, reason: null },
        error: { hasError: false },
        polling: {
          session: {
            isPolling: false,
            lastPollTime: null,
            nextPollTime: null,
            error: { hasError: false },
          },
          messages: {
            isPolling: false,
            lastPollTime: null,
            nextPollTime: null,
            error: { hasError: false },
          },
        },
      });

      onSessionDestroy?.();
    } catch (error) {
      chatState.setStatePartial({
        error: {
          hasError: true,
          message:
            error instanceof Error ? error.message : "Failed to clear session",
          code: "SESSION_CLEAR_FAILED",
        },
      });
    }
  }

  /**
   * Cleans up the session and stops polling
   */
  function cleanup() {
    try {
      if (stopPolling) {
        stopPolling();
        stopPolling = null;
      }

      chatState.setState({
        messages: [],
        keyboard: null,
        loading: { isLoading: false, reason: null },
        error: { hasError: false },
        polling: {
          session: {
            isPolling: false,
            lastPollTime: null,
            nextPollTime: null,
            error: { hasError: false },
          },
          messages: {
            isPolling: false,
            lastPollTime: null,
            nextPollTime: null,
            error: { hasError: false },
          },
        },
      });

      sessionState.setState(null);
      chatState.clear();
      sessionState.clear();
    } catch (error) {
      chatState.setStatePartial({
        error: {
          hasError: true,
          message: error instanceof Error ? error.message : "Failed to cleanup",
          code: "SESSION_CLEAR_FAILED",
        },
      });
    }
  }

  /**
   * Fetches the session from the API
   * @param id - The ID of the session to fetch
   * @returns The session
   */
  async function fetchSession(id: string) {
    return api.getSession(id);
  }

  /**
   * Refetches the session and updates the state
   */
  async function refetchSession() {
    const session = sessionState.getState();
    if (!session?.id) return;
    const { data: newSession } = await fetchSession(session.id);
    if (newSession) {
      sessionState.setState(newSession);
    }
    return newSession;
  }

  return {
    createSession,
    clearSession,
    cleanup,
    startPolling,
    fetchSession,
    refetchSession,
  };
}

export type SendMessageInput = SomeOptional<
  SafeOmit<SendChatDto, "bot_token" | "uuid">,
  "session_id" | "user"
>;

export function createChat(options: ChatOptions) {
  const initialState = <ChatState>{
    messages: [],
    keyboard: null,
    loading: { isLoading: false, reason: null },
    error: { hasError: false },
    polling: {
      session: {
        isPolling: false,
        lastPollTime: null,
        nextPollTime: null,
        error: { hasError: false },
      },
      messages: {
        isPolling: false,
        lastPollTime: null,
        nextPollTime: null,
        error: { hasError: false },
      },
    },
  };
  const chatState = new PubSub<ChatState>(initialState);

  const {
    contactState,
    cleanup: cleanupContact,
    shouldCollectData,
    createUnauthenticatedContact,
  } = createContactHandler({ config: options.config, api: options.api });

  const sessionState = new PubSub<WidgetSessionDto | null>(null);

  const messageHandler = createMessageHandler(
    options.api,
    chatState,
    options.config,
  );

  const sessionManager = createSessionManager(
    options.api,
    sessionState,
    chatState,
    messageHandler,
    options?.onSessionDestroy,
  );

  async function sendMessage(input: SendMessageInput, abort?: AbortSignal) {
    let session = sessionState.getState();
    let createdSession = false;

    if (!session?.id) {
      session = await sessionManager.createSession();
      if (!session)
        return {
          success: false,
          createdSession,
        };
      createdSession = true;
    }

    if (session.assignee.kind === "ai") {
      session = (await sessionManager.refetchSession()) ?? session;
    }

    try {
      if (session.assignee.kind === "ai") {
        chatState.setStatePartial({
          loading: { isLoading: true, reason: "sending_message_to_bot" },
          error: { hasError: false },
        });
      } else {
        chatState.setStatePartial({
          loading: { isLoading: true, reason: "sending_message_to_agent" },
          error: { hasError: false },
        });
      }

      const userMessage = messageHandler.toUserMessage(
        input.content,
        input.attachments || undefined,
      );
      const currentMessages = chatState.getState().messages;
      chatState.setStatePartial({
        messages: [...currentMessages, userMessage],
      });

      const config = options.config;
      const { data } = await options.api.handleMessage(
        {
          uuid: userMessage.id,
          bot_token: config.token,
          headers: config.headers,
          query_params: config.queryParams,
          session_id: session.id,
          user: config.user,
          ...input,
        },
        abort,
      );

      if (data?.success) {
        const botMessage = messageHandler.toBotMessage(data);
        if (botMessage) {
          const updatedMessages = chatState.getState().messages;
          chatState.setStatePartial({
            messages: [...updatedMessages, botMessage],
          });
        }
        return {
          success: true,
          createdSession,
          botMessage,
        };
      } else {
        const errorMessage = messageHandler.addErrorMessage(
          data?.error?.message || "Unknown error occurred",
        );
        const currentMessages = chatState.getState().messages;
        chatState.setStatePartial({
          messages: [...currentMessages, errorMessage],
        });
        return {
          success: false,
          createdSession,
          error: data?.error,
        };
      }
    } catch (error) {
      chatState.setStatePartial({
        error: {
          hasError: true,
          message:
            error instanceof Error ? error.message : "Failed to send message",
          code: "MESSAGE_SEND_FAILED",
        },
      });
      return {
        success: false,
        createdSession,
        error,
      };
    } finally {
      chatState.setStatePartial({
        loading: { isLoading: false, reason: null },
      });
    }
  }

  async function recreateSession() {
    await sessionManager.clearSession();
    await sessionManager.createSession();
  }

  const cleanup = () => {
    cleanupContact();
    sessionManager.cleanup();
  };

  return {
    chatState,
    sessionState,
    sendMessage,
    createSession: sessionManager.createSession,
    clearSession: sessionManager.clearSession,
    cleanup,
    initialState,
    recreateSession,
    contactState,
    contactManager: {
      shouldCollectData,
      createUnauthenticatedContact,
    },
  };
}
