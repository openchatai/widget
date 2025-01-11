import { PubSub } from "../types/pub-sub";
import { MessageType } from "../types";
import { ApiCaller } from "./api";
import { genUuid } from "../utils/genUuid";
import { HandleContactMessageOutputSchema, HttpChatInputSchema, WidgetHistorySchema, WidgetSessionSchema } from "../types/schemas-v2";
import { LoadingState, ErrorState, SomeOptional } from "../types/helpers";
import { ConfigInstance } from "./config";
import { Platform, isStorageAvailable } from "../platform";
import { Logger } from "../platform/logger";
import { ExternalIdNotDefinedError, StorageNotAvailableError } from "@core/errors";

// Constants
const POLLING_INTERVALS = {
    SESSION: 10000, // every 10 seconds
    MESSAGES: 5000  // every 5 seconds
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
function mapHistoryToMessage(history: WidgetHistorySchema): MessageType {
    const commonFields = {
        id: history.publicId,
        timestamp: history.sentAt || "",
        attachments: history.attachments || undefined
    };

    if (history.sender.kind === 'user') {
        return {
            ...commonFields,
            type: "FROM_USER",
            content: history.content.text || "",
            deliveredAt: history.sentAt || "",
        };
    }

    if (history.sender.kind === 'agent') {
        return {
            id: history.publicId,
            type: "FROM_AGENT",
            component: history.type,
            data: {
                text: history.content.text
            },
            timestamp: history.sentAt || "",
            attachments: history.attachments || undefined
        }
    }

    return {
        ...commonFields,
        type: "FROM_BOT",
        component: 'TEXT',
        agent: {
            id: null,
            name: history.sender.name || '',
            is_ai: history.sender.kind === 'ai',
            profile_picture: history.sender.avatar
        },
        data: {
            message: history.content.text
        },
    };
}

// Message Handling
function createMessageHandler(api: ApiCaller, state: PubSub<ChatState>, logger?: Logger) {
    async function fetchHistoryMessages(session: WidgetSessionSchema) {
        const messages = state.getState().messages;
        if (messages.length === 0) {
            logger?.debug('No messages yet, fetching all history', { sessionId: session.id });
            const response = await api.getSessionHistory(session.id, "");
            if (response && response.length > 0) {
                state.setStatePartial({
                    messages: response.map(mapHistoryToMessage)
                });
            }
            return;
        }
        const lastMessageTimestamp = state.getState().messages.at(-1)?.timestamp
        logger?.debug('Fetching history messages after timestamp', {
            sessionId: session.id,
            lastMessageTimestamp,
            currentMessageCount: messages.length
        });

        const response = await api.getSessionHistory(session.id, lastMessageTimestamp);

        if (response && response.length > 0) {
            // Map and filter out any potential duplicates by ID
            const newMessages = response
                .map(mapHistoryToMessage)
                .filter(newMsg => !messages.some(existingMsg => existingMsg.id === newMsg.id));

            if (newMessages.length > 0) {
                logger?.debug('Adding new messages to state', {
                    count: newMessages.length,
                    messageIds: newMessages.map(m => m.id),
                    messageTypes: newMessages.map(m => m.type)
                });
                state.setStatePartial({
                    messages: [...messages, ...newMessages]
                });
            }
        }
    }

    function addUserMessage(content: string, attachments?: any[]) {
        return {
            id: genUuid(),
            type: "FROM_USER" as const,
            content,
            deliveredAt: new Date().toISOString(),
            attachments,
            timestamp: new Date().toISOString()
        };
    }

    function addBotMessage(response: HandleContactMessageOutputSchema) {
        if (response.success && response.autopilotResponse) {
            return {
                type: "FROM_BOT" as const,
                id: response.autopilotResponse.id || genUuid(),
                timestamp: new Date().toISOString(),
                component: "TEXT",
                data: {
                    message: response.autopilotResponse.value.content,
                }
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
                variant: "error"
            }
        };
    }

    return {
        fetchHistoryMessages,
        addUserMessage,
        addBotMessage,
        addErrorMessage
    };
}

// Session Management
function createSessionManager(
    api: ApiCaller,
    sessionState: PubSub<WidgetSessionSchema | null>,
    chatState: PubSub<ChatState>,
    messageHandler: ReturnType<typeof createMessageHandler>,
    config: ConfigInstance,
    options: ChatOptions
) {
    const logger = options.platform?.logger;
    let stopPolling: (() => void) | null = null;
    const storage = options.platform?.storage;
    const persistSession = config.getSettings().persistSession;

    if (persistSession && !isStorageAvailable(storage)) {
        throw new StorageNotAvailableError()
    }

    if (persistSession && !config.getConfig().user.external_id) {
        throw new ExternalIdNotDefinedError("session persistence is enabled but external id is not defined")
    }

    const sessionStorageKey = `${config.getConfig().user.external_id}:${config.getConfig().token}:session`;
    /**
     * Restores the session from storage
     */
    async function restoreSession() {
        if (!storage) return;
        try {
            logger?.debug('Attempting to restore session from storage');
            const storedSession = await storage.getItem(sessionStorageKey);
            if (storedSession) {
                const session = JSON.parse(storedSession) as WidgetSessionSchema;
                logger?.info('Session restored from storage', { sessionId: session.id });
                sessionState.setState(session);
                await messageHandler.fetchHistoryMessages(session);
                startPolling();
            }
        } catch (error) {
            logger?.error('Error restoring session from storage:', error);
        }
    }

    /**
     * Sets up session persistence
     */
    function setupSessionPersistence() {
        if (!storage) return;
        logger?.debug('Setting up session persistence');
        sessionState.subscribe(async (session) => {
            try {
                if (session) {
                    await storage.setItem(sessionStorageKey, JSON.stringify(session));
                    logger?.debug('Session persisted to storage', { sessionId: session.id });
                } else {
                    await storage.removeItem(sessionStorageKey);
                    logger?.debug('Session removed from storage');
                }
            } catch (error) {
                logger?.error('Error persisting session:', error);
                chatState.setStatePartial({
                    error: {
                        hasError: true,
                        message: error instanceof Error ? error.message : 'Failed to persist session',
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
                                nextPollTime: new Date(now.getTime() + POLLING_INTERVALS.SESSION).toISOString(),
                                error: { hasError: false }
                            }
                        }
                    });

                    const response = await api.getSession(session.id);
                    if (response) {
                        sessionState.setState(response);
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
                                    message: error instanceof Error ? error.message : 'Failed to poll session',
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
                                nextPollTime: new Date(now.getTime() + POLLING_INTERVALS.MESSAGES).toISOString(),
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
                                    message: error instanceof Error ? error.message : 'Failed to poll messages',
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
        try {
            logger?.info('Creating new session');
            chatState.setStatePartial({
                loading: { isLoading: true, reason: 'creating_session' },
                error: { hasError: false }
            });

            const session = await api.createSession();
            logger?.info('Session created successfully', { sessionId: session.id });
            sessionState.setState(session);
            startPolling();
            return session;
        } catch (error) {
            logger?.error('Failed to create session:', error);
            const errorState = {
                hasError: true,
                message: error instanceof Error ? error.message : 'Failed to create session',
                code: 'SESSION_CREATION_FAILED' as const
            };
            chatState.setStatePartial({ error: errorState });
            return null;
        } finally {
            chatState.setStatePartial({
                loading: { isLoading: false, reason: null }
            });
        }
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

            if (persistSession && storage) {
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
            console.error("Error clearing session:", error);
            chatState.setStatePartial({
                error: {
                    hasError: true,
                    message: error instanceof Error ? error.message : 'Failed to clear session',
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

            if (removeSession && persistSession && storage && isStorageAvailable(storage)) {
                storage.removeItem(sessionStorageKey);
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
            console.error("Error in cleanup:", error);
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
        const newSession = await fetchSession(session.id);
        if (newSession) {
            sessionState.setState(newSession);
        }
        return newSession;
    }

    // Initialize session if persistence is enabled
    if (persistSession && isStorageAvailable(storage)) {
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
export type SendMessageInput = SomeOptional<Omit<HttpChatInputSchema, "bot_token">, "session_id" | "user">
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
    }
    const state = new PubSub<ChatState>(initialState);

    const sessionState = new PubSub<WidgetSessionSchema | null>(null);
    const messageHandler = createMessageHandler(options.api, state, logger);
    const sessionManager = createSessionManager(
        options.api,
        sessionState,
        state,
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
            if (!session) return {
                success: false,
                createdSession,
            }
            createdSession = true;
        }

        if (session.assignee.kind === 'ai') {
            session = (await sessionManager.refetchSession()) ?? session;
        }

        try {
            logger?.debug('Sending message', { sessionId: session.id });
            if (session.assignee.kind === 'ai') {
                state.setStatePartial({
                    loading: { isLoading: true, reason: 'sending_message_to_bot' },
                    error: { hasError: false }
                });
            } else {
                state.setStatePartial({
                    loading: { isLoading: true, reason: 'sending_message_to_agent' },
                    error: { hasError: false }
                });
            }

            const userMessage = messageHandler.addUserMessage(input.content, input.attachments || undefined);
            const currentMessages = state.getState().messages;
            state.setStatePartial({
                messages: [...currentMessages, userMessage]
            });

            const config = options.config.getConfig();
            const data = await options.api.handleMessage({
                uuid: input.uuid || genUuid(),
                bot_token: config.token,
                headers: config.headers,
                query_params: config.queryParams,
                session_id: session.id,
                user: config.user,
                ...input,
            }, abort);

            if (data.success) {
                logger?.debug('Message sent successfully');
                const botMessage = messageHandler.addBotMessage(data);
                if (botMessage) {
                    const updatedMessages = state.getState().messages;
                    state.setStatePartial({
                        messages: [...updatedMessages, botMessage]
                    });
                }
                return {
                    success: true,
                    createdSession,
                    botMessage
                }
            } else {
                logger?.warn('Message send failed', data.error);
                const errorMessage = messageHandler.addErrorMessage(data.error?.message || "Unknown error occurred");
                const currentMessages = state.getState().messages;
                state.setStatePartial({
                    messages: [...currentMessages, errorMessage]
                });
                return {
                    success: false,
                    createdSession,
                    error: data.error
                }
            }
        } catch (error) {
            logger?.error('Error sending message:', error);
            state.setStatePartial({
                error: {
                    hasError: true,
                    message: error instanceof Error ? error.message : 'Failed to send message',
                    code: 'MESSAGE_SEND_FAILED'
                }
            });
            return {
                success: false,
                createdSession,
                error
            }
        } finally {
            state.setStatePartial({
                loading: { isLoading: false, reason: null }
            });
        }
    }

    return {
        chatState: state,
        sessionState,
        sendMessage,
        createSession: sessionManager.createSession,
        clearSession: sessionManager.clearSession,
        cleanup: sessionManager.cleanup,
        initialState,
        sessionStorageKey: sessionManager.sessionStorageKey
    };
} 