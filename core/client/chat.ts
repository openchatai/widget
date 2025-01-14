import { PubSub } from '../types/pub-sub';
import { MessageType, UserMessageType } from '../types';
import { ApiCaller } from './api';
import { genUuid } from '../utils/genUuid';
import {
  ChatAttachmentType,
  HandleContactMessageOutputSchema,
  SendChatDto,
  WidgetHistoryDto,
  WidgetSessionDto
} from '../types/schemas-v2';
import {
  LoadingState,
  ErrorState,
  SomeOptional,
  SafeOmit
} from '../types/helpers';
import { ConfigInstance } from './config';
import {
  Platform,
  isStorageAvailable,
  safeStorageOperation
} from '../platform';
import { Logger } from '../platform/logger';
import {
  ExternalIdNotDefinedError,
  StorageNotAvailableError
} from '@core/errors';
import { isAudioAvailable, safeAudioOperation } from '@core/platform/audio';
import { createContact } from './contact';

// Constants
const POLLING_INTERVALS = {
  SESSION: 10000, // every 10 seconds
  MESSAGES: 5000 // every 5 seconds
} as const;

// Types
export type PollingType = 'session' | 'messages';

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
  config: ConfigInstance;
  onSessionDestroy?: () => void;
  platform: Platform;
};

// Message Mapping
function mapHistoryToMessage(history: WidgetHistoryDto): MessageType {
  const commonFields = {
    id: history.publicId,
    timestamp: history.sentAt || '',
    attachments: history.attachments || undefined
  };

  if (history.sender.kind === 'user') {
    return {
      ...commonFields,
      type: 'FROM_USER',
      content: history.content.text || '',
      deliveredAt: history.sentAt || ''
    };
  }

  if (history.sender.kind === 'agent') {
    return {
      id: history.publicId,
      type: 'FROM_AGENT',
      component: history.type,
      data: {
        text: history.content.text
      },
      timestamp: history.sentAt || '',
      attachments: history.attachments || undefined
    };
  }

  return {
    ...commonFields,
    type: 'FROM_BOT',
    component: 'TEXT',
    agent: {
      id: null,
      name: history.sender.name || '',
      isAi: history.sender.kind === 'ai',
      avatar: history.sender.avatar || null
    },
    data: {
      message: history.content.text
    }
  };
}

// Message Handling
function createMessageHandler(
  api: ApiCaller,
  state: PubSub<ChatState>,
  logger?: Logger,
  config?: ConfigInstance,
  platform?: Platform
) {
  async function fetchHistoryMessages(session: WidgetSessionDto) {
    const messages = state.getState().messages;
    const lastMessageTimestamp = state.getState().messages.at(-1)?.timestamp;

    const { data: response } = await api.getSessionHistory(
      session.id,
      lastMessageTimestamp
    );

    if (response && response.length > 0) {
      const newMessages = response
        .map(mapHistoryToMessage)
        .filter(
          (newMsg) =>
            !messages.some((existingMsg) => existingMsg.id === newMsg.id)
        );

      if (newMessages.length > 0) {
        logger?.debug('Adding new messages to state', {
          count: newMessages.length,
          messageIds: newMessages.map((m) => m.id),
          messageTypes: newMessages.map((m) => m.type)
        });
        const useSoundEffects = config?.getConfig().settings.useSoundEffects;
        // Play notification sound for new messages if enabled
        if (
          useSoundEffects &&
          platform?.audio &&
          isAudioAvailable(platform.audio)
        ) {
          const botMessages = newMessages.filter(
            (msg) => msg.type === 'FROM_BOT'
          );
          if (botMessages.length > 0) {
            await safeAudioOperation(
              () => platform.audio!.playNotification(),
              'Failed to play notification sound for new messages'
            );
          }
        }

        state.setStatePartial({
          messages: [...messages, ...newMessages]
        });
      }
    }
  }

  function toUserMessage(
    content: string,
    attachments?: ChatAttachmentType[]
  ): UserMessageType {
    return {
      id: genUuid(),
      type: 'FROM_USER',
      content,
      deliveredAt: new Date().toISOString(),
      attachments,
      timestamp: new Date().toISOString()
    };
  }

  function addBotMessage(response: HandleContactMessageOutputSchema) {
    if (response.success && response.autopilotResponse) {
      return {
        type: 'FROM_BOT' as const,
        id: response.autopilotResponse.id || genUuid(),
        timestamp: new Date().toISOString(),
        component: 'TEXT',
        data: {
          message: response.autopilotResponse.value.content
        }
      };
    }

    if (response.success && response.uiResponse) {
      const uiVal = response.uiResponse.value;
      return {
        type: 'FROM_BOT' as const,
        id: genUuid(),
        timestamp: new Date().toISOString(),
        component: uiVal.name,
        data: uiVal.request_response
      };
    }

    return null;
  }

  function addErrorMessage(message: string) {
    return {
      type: 'FROM_BOT' as const,
      id: genUuid(),
      timestamp: new Date().toISOString(),
      component: 'TEXT',
      data: {
        message,
        variant: 'error'
      }
    };
  }

  return {
    fetchHistoryMessages,
    toUserMessage,
    addBotMessage,
    addErrorMessage
  };
}

// Session Management
function createSessionManager(
  api: ApiCaller,
  sessionState: PubSub<WidgetSessionDto | null>,
  chatState: PubSub<ChatState>,
  messageHandler: ReturnType<typeof createMessageHandler>,
  config: ConfigInstance,
  options: ChatOptions
) {
  let stopPolling: (() => void) | null = null;
  const logger = options.platform?.logger;
  const storage = options.platform?.storage;
  const persistSession = () => config.getConfig().settings.persistSession;

  if (persistSession() && !isStorageAvailable(storage)) {
    throw new StorageNotAvailableError();
  }

  if (persistSession() && !config.getConfig().user.external_id) {
    logger?.error(
      'session persistence is enabled but external id is not defined'
    );
  }

  const { token, user } = config.getConfig();
  const sessionStorageKey = `${
    user.external_id ?? user.email ?? 'unknown'
  }:${token}:session`;
  /**
   * Restores the session from storage
   */
  async function restoreSession() {
    logger?.debug('Restoring session from storage', {
      sessionStorageKey,
      stroageAvailable: isStorageAvailable(storage)
    });
    if (isStorageAvailable(storage)) {
      safeStorageOperation(async () => {
        logger?.debug('Attempting to restore session from storage');
        const storedSession = await storage.getItem(sessionStorageKey);
        if (storedSession) {
          const session = JSON.parse(storedSession) as WidgetSessionDto;
          logger?.info('Session restored from storage', {
            sessionId: session.id
          });
          sessionState.setState(session);
          await messageHandler.fetchHistoryMessages(session);
          startPolling();
        }
      }, 'Error restoring session from storage');
    }
  }

  /**
   * Sets up session persistence
   */
  function setupSessionPersistence() {
    logger?.debug('Setting up session persistence', {
      sessionStorageKey,
      stroageAvailable: isStorageAvailable(storage)
    });
    if (!isStorageAvailable(storage)) return;
    sessionState.subscribe(async (session) => {
      try {
        if (session) {
          await storage.setItem(sessionStorageKey, JSON.stringify(session));
          logger?.debug('Session persisted to storage', {
            sessionId: session.id
          });
        } else {
          await storage.removeItem(sessionStorageKey);
          logger?.debug('Session removed from storage');
        }
      } catch (error) {
        logger?.error('Error persisting session:', error);
        chatState.setStatePartial({
          error: {
            hasError: true,
            message:
              error instanceof Error
                ? error.message
                : 'Failed to persist session',
            code: 'SESSION_PERSISTENCE_FAILED'
          }
        });
      }
    });
  }

  /**
   * Starts polling for the session and messages
   */
  function startPolling() {
    if (stopPolling) return;

    logger?.debug('Starting polling');
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
                  now.getTime() + POLLING_INTERVALS.SESSION
                ).toISOString(),
                error: { hasError: false }
              }
            }
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
                isPolling: false
              }
            }
          });
        } catch (error) {
          logger?.error('Error polling session:', error);
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
                      : 'Failed to poll session',
                  code: 'SESSION_POLLING_FAILED'
                }
              }
            }
          });
        }
      }, POLLING_INTERVALS.SESSION)
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
                  now.getTime() + POLLING_INTERVALS.MESSAGES
                ).toISOString(),
                error: { hasError: false }
              }
            }
          });

          await messageHandler.fetchHistoryMessages(session);

          chatState.setStatePartial({
            polling: {
              ...chatState.getState().polling,
              messages: {
                ...chatState.getState().polling.messages,
                isPolling: false
              }
            }
          });
        } catch (error) {
          logger?.error('Error polling messages:', error);
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
                      : 'Failed to poll messages',
                  code: 'MESSAGES_POLLING_FAILED'
                }
              }
            }
          });
        }
      }, POLLING_INTERVALS.MESSAGES)
    );

    stopPolling = () => {
      logger?.debug('Stopping polling');
      intervals.forEach(clearInterval);
      // Reset polling states
      chatState.setStatePartial({
        polling: {
          session: {
            isPolling: false,
            lastPollTime: null,
            nextPollTime: null,
            error: { hasError: false }
          },
          messages: {
            isPolling: false,
            lastPollTime: null,
            nextPollTime: null,
            error: { hasError: false }
          }
        }
      });
    };
  }

  /**
   * Creates a new session
   * @returns The session
   */
  async function createSession() {
    logger?.info('Creating new session');
    chatState.setStatePartial({
      loading: { isLoading: true, reason: 'creating_session' },
      error: { hasError: false }
    });

    const { data: session, error } = await api.createSession();
    if (session) {
      logger?.info('Session created successfully', { sessionId: session.id });
      sessionState.setState(session);
      chatState.setStatePartial({
        loading: { isLoading: false, reason: null }
      });
      startPolling();
      return session;
    }

    logger?.error('Failed to create session:', error);
    const errorState = {
      hasError: true,
      message:
        error instanceof Error ? error.message : 'Failed to create session',
      code: 'SESSION_CREATION_FAILED' as const
    };
    chatState.setStatePartial({
      error: errorState,
      loading: { isLoading: false, reason: null }
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

      if (persistSession() && storage) {
        await storage.removeItem(sessionStorageKey);
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
            error: { hasError: false }
          },
          messages: {
            isPolling: false,
            lastPollTime: null,
            nextPollTime: null,
            error: { hasError: false }
          }
        }
      });

      options.onSessionDestroy?.();
    } catch (error) {
      chatState.setStatePartial({
        error: {
          hasError: true,
          message:
            error instanceof Error ? error.message : 'Failed to clear session',
          code: 'SESSION_CLEAR_FAILED'
        }
      });
    }
  }

  /**
   * Cleans up the session and stops polling
   */
  function cleanup(removeSession = false) {
    try {
      if (stopPolling) {
        stopPolling();
        stopPolling = null;
      }

      if (removeSession && persistSession() && isStorageAvailable(storage)) {
        console.log('removing session data', sessionStorageKey);
        safeStorageOperation(
          () => storage.removeItem(sessionStorageKey),
          'Error removing session data'
        );
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
            error: { hasError: false }
          },
          messages: {
            isPolling: false,
            lastPollTime: null,
            nextPollTime: null,
            error: { hasError: false }
          }
        }
      });

      sessionState.setState(null);
      chatState.clear();
      sessionState.clear();
    } catch (error) {
      chatState.setStatePartial({
        error: {
          hasError: true,
          message: error instanceof Error ? error.message : 'Failed to cleanup',
          code: 'SESSION_CLEAR_FAILED'
        }
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

  // Initialize session if persistence is enabled
  if (persistSession() && isStorageAvailable(storage)) {
    logger?.debug('Initializing session persistence', {
      sessionStorageKey,
      stroageAvailable: isStorageAvailable(storage)
    });
    restoreSession();
    setupSessionPersistence();
  }

  return {
    createSession,
    clearSession,
    cleanup,
    startPolling,
    fetchSession,
    refetchSession,
    sessionStorageKey
  };
}

export type SendMessageInput = SomeOptional<
  SafeOmit<SendChatDto, 'bot_token' | 'uuid'>,
  'session_id' | 'user'
>;

// Main Chat Function
export function createChat(options: ChatOptions) {
  const logger = options.platform?.logger;
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
        error: { hasError: false }
      },
      messages: {
        isPolling: false,
        lastPollTime: null,
        nextPollTime: null,
        error: { hasError: false }
      }
    }
  };
  const chatState = new PubSub<ChatState>(initialState);

  const {
    contactState,
    cleanup: cleanupContact,
    shouldCollectData
  } = createContact(
    { config: options.config, api: options.api },
    options.platform
  );

  const sessionState = new PubSub<WidgetSessionDto | null>(null);

  const messageHandler = createMessageHandler(
    options.api,
    chatState,
    logger,
    options.config,
    options.platform
  );

  const sessionManager = createSessionManager(
    options.api,
    sessionState,
    chatState,
    messageHandler,
    options.config,
    options
  );

  async function sendMessage(input: SendMessageInput, abort?: AbortSignal) {
    let session = sessionState.getState();
    let createdSession = false;

    if (!session?.id) {
      logger?.debug('No active session, creating new session');
      session = await sessionManager.createSession();
      if (!session)
        return {
          success: false,
          createdSession
        };
      createdSession = true;
    }

    if (session.assignee.kind === 'ai') {
      session = (await sessionManager.refetchSession()) ?? session;
    }

    try {
      logger?.debug('Sending message', { sessionId: session.id });
      if (session.assignee.kind === 'ai') {
        chatState.setStatePartial({
          loading: { isLoading: true, reason: 'sending_message_to_bot' },
          error: { hasError: false }
        });
      } else {
        chatState.setStatePartial({
          loading: { isLoading: true, reason: 'sending_message_to_agent' },
          error: { hasError: false }
        });
      }

      const userMessage = messageHandler.toUserMessage(
        input.content,
        input.attachments || undefined
      );
      const currentMessages = chatState.getState().messages;
      chatState.setStatePartial({
        messages: [...currentMessages, userMessage]
      });

      const config = options.config.getConfig();
      const { data } = await options.api.handleMessage(
        {
          uuid: userMessage.id,
          bot_token: config.token,
          headers: config.headers,
          query_params: config.queryParams,
          session_id: session.id,
          user: config.user,
          ...input
        },
        abort
      );

      if (data?.success) {
        logger?.debug('Message sent successfully');
        const botMessage = messageHandler.addBotMessage(data);
        if (botMessage) {
          const updatedMessages = chatState.getState().messages;
          chatState.setStatePartial({
            messages: [...updatedMessages, botMessage]
          });
        }
        return {
          success: true,
          createdSession,
          botMessage
        };
      } else {
        logger?.warn('Message send failed', data?.error);
        const errorMessage = messageHandler.addErrorMessage(
          data?.error?.message || 'Unknown error occurred'
        );
        const currentMessages = chatState.getState().messages;
        chatState.setStatePartial({
          messages: [...currentMessages, errorMessage]
        });
        return {
          success: false,
          createdSession,
          error: data?.error
        };
      }
    } catch (error) {
      logger?.error('Error sending message:', error);
      chatState.setStatePartial({
        error: {
          hasError: true,
          message:
            error instanceof Error ? error.message : 'Failed to send message',
          code: 'MESSAGE_SEND_FAILED'
        }
      });
      return {
        success: false,
        createdSession,
        error
      };
    } finally {
      chatState.setStatePartial({
        loading: { isLoading: false, reason: null }
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
    sessionStorageKey: sessionManager.sessionStorageKey,
    recreateSession,
    contactState,
    shouldCollectData
  };
}
