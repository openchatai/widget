import { PubSub } from "../types/pub-sub";
import { MessageType } from "../types";
import { ApiCaller } from "./api";
import { genId } from "../utils/genId";
import { HttpChatInputSchema, WidgetHistorySchema, WidgetSessionSchema } from "../types/schemas-v2";
import { LoadingState, ErrorState, SomeOptional } from "../types/helpers";
import { ConfigInstance } from "./config";
import { Platform, isStorageAvailable } from "../platform";

const SESSION_POLLING_INTERVAL = 10000; // every 10 seconds
const MESSAGE_POLLING_INTERVAL = 5000; // every 5 seconds

type ChatState = {
    messages: MessageType[];
    keyboard: { options: string[] } | null;
    loading: LoadingState;
    error: ErrorState;
};

type ChatOptions = {
    api: ApiCaller;
    config: ConfigInstance;
    onSessionDestroy?: () => void;
    persistSession?: boolean;
    platform: Platform;
};


function mapHistoryToMessage(history: WidgetHistorySchema): MessageType {
    if (history.sender.kind === 'user') {
        return {
            id: history.publicId || genId(),
            type: "FROM_USER",
            content: history.content.text || "",
            deliveredAt: history.sentAt || "",
            attachments: history.attachments || undefined,
            timestamp: history.sentAt || ""
        };
    }

    return {
        id: history.publicId || genId(),
        type: "FROM_BOT",
        component: history.type,
        data: {
            text: history.content.text
        },
        timestamp: history.sentAt || "",
        attachments: history.attachments || undefined
    };
}

const fetchHistoryMessages = async (api: ApiCaller, session: WidgetSessionSchema, state: PubSub<ChatState>) => {
    const lastMessageTimestamp = state.state.messages[state.state.messages.length - 1]?.timestamp || "";
    const response = await api.getSessionHistory(session.id, lastMessageTimestamp);
    if (response) {
        const extraMessages = response.map(mapHistoryToMessage).filter(msg => !state.state.messages.some(m => m.id === msg.id));
        state.setStatePartial({
            messages: [...state.state.messages, ...extraMessages]
        })
    }
}

function startPolling(
    api: ApiCaller,
    sessionState: PubSub<WidgetSessionSchema | null>,
    state: PubSub<ChatState>
) {
    const intervals: NodeJS.Timeout[] = [];

    // Poll session
    intervals.push(
        setInterval(async () => {
            const session = sessionState.getState();
            if (!session?.id) return;

            try {
                const response = await api.getSession(session.id);
                if (response) {
                    sessionState.setState(response);
                }
            } catch (error) {
                console.error("Error polling session:", error);
            }
        }, SESSION_POLLING_INTERVAL)
    );

    // Poll messages
    intervals.push(
        setInterval(async () => {
            const session = sessionState.state
            if (!session?.id) return;
            try {
                await fetchHistoryMessages(api, session, state);
            } catch (error) {
                console.error("Error polling messages:", error);
            }
        }, MESSAGE_POLLING_INTERVAL)
    );

    return () => intervals.forEach(clearInterval);
}

export function createChat(options: ChatOptions) {
    const state = new PubSub<ChatState>({
        messages: [],
        keyboard: null,
        loading: { isLoading: false },
        error: { hasError: false }
    });

    const config = options.config.getConfig();
    const sessionState = new PubSub<WidgetSessionSchema | null>(null);
    let stopPolling: (() => void) | null = null;

    // Session persistence
    const storage = options.platform?.storage;
    const sessionStorageKey = `${config.user.external_id}:${config.token}:session`;

    // Try to restore session from storage
    if (options.persistSession && isStorageAvailable(storage)) {
        try {
            const storedSession = storage.getItem(sessionStorageKey);
            if (storedSession) {
                const session = JSON.parse(storedSession) as WidgetSessionSchema;
                sessionState.setState(session);
                fetchHistoryMessages(options.api, session, state);
                if (!stopPolling) {
                    stopPolling = startPolling(options.api, sessionState, state);
                }
            }
        } catch (error) {
            console.error("Error restoring session from storage:", error);
        }
    }

    // Subscribe to session changes to persist
    if (options.persistSession && isStorageAvailable(storage)) {
        sessionState.subscribe((session) => {
            try {
                if (session) {
                    storage.setItem(sessionStorageKey, JSON.stringify(session));
                } else {
                    storage.removeItem(sessionStorageKey);
                }
            } catch (error) {
                console.error("Error persisting session:", error);
                state.setStatePartial({
                    error: {
                        hasError: true,
                        message: error instanceof Error ? error.message : 'Failed to persist session',
                        code: 'SESSION_PERSISTENCE_FAILED'
                    }
                });
            }
        });
    }

    async function createSession() {
        try {
            state.setStatePartial({
                loading: { isLoading: true, reason: 'creating_session' },
                error: { hasError: false }
            });
            const session = await options.api.createSession();
            sessionState.setState(session);
            if (!stopPolling) {
                stopPolling = startPolling(options.api, sessionState, state);
            }
            return session;
        } catch (error) {
            const errorState = {
                hasError: true,
                message: error instanceof Error ? error.message : 'Failed to create session',
                code: 'SESSION_CREATION_FAILED' as const
            };
            state.setStatePartial({ error: errorState });
            return null;
        } finally {
            state.setStatePartial({
                loading: { isLoading: false, reason: null }
            });
        }
    }

    async function clearSession() {
        const session = sessionState.getState();
        if (!session?.id) return;

        try {
            if (stopPolling) {
                stopPolling();
                stopPolling = null;
            }
            sessionState.setState(null);
            // Clear session from storage if persistence is enabled
            if (options.persistSession && storage && isStorageAvailable(storage)) {
                storage.removeItem(sessionStorageKey);
            }
            state.setState({
                messages: [],
                keyboard: null,
                loading: { isLoading: false },
                error: { hasError: false }
            });
            options.onSessionDestroy?.();
        } catch (error) {
            console.error("Error clearing session:", error);
            state.setStatePartial({
                error: {
                    hasError: true,
                    message: error instanceof Error ? error.message : 'Failed to clear session',
                    code: 'SESSION_CLEAR_FAILED'
                }
            });
        }
    }

    function cleanup() {
        try {
            if (stopPolling) {
                stopPolling();
                stopPolling = null;
            }
            // Clear session from storage if persistence is enabled
            if (options.persistSession && storage && isStorageAvailable(storage)) {
                storage.removeItem(sessionStorageKey);
            }
            state.setState({
                messages: [],
                keyboard: null,
                loading: { isLoading: false },
                error: { hasError: false }
            });
            sessionState.setState(null);
            state.clear();
            sessionState.clear();
        } catch (error) {
            console.error("Error in cleanup:", error);
            state.setStatePartial({
                error: {
                    hasError: true,
                    message: error instanceof Error ? error.message : 'Failed to cleanup',
                    code: 'SESSION_CLEAR_FAILED'
                }
            });
        }
    }

    const sendMessage = async (input: SomeOptional<Omit<HttpChatInputSchema, "bot_token">, "session_id" | "user">) => {
        let session = sessionState.state;
        if (!session?.id) {
            session = await createSession();
            if (!session) {
                return false;
            }
        }
        try {
            state.setStatePartial({
                loading: { isLoading: true, reason: 'sending_message' },
                error: { hasError: false }
            });

            state.setStatePartial({
                messages: [
                    ...state.state.messages,
                    {
                        id: genId(),
                        type: "FROM_USER",
                        content: input.content,
                        deliveredAt: new Date().toISOString(),
                        attachments: input.attachments || undefined,
                        timestamp: new Date().toISOString()
                    }
                ]
            });

            const data = await options.api.handleMessage({
                bot_token: config.token,
                headers: config.headers,
                query_params: config.queryParams,
                session_id: session.id,
                ...input,
            });
            if (data.success) {
                if (data.autopilotResponse) {
                    state.setStatePartial({
                        messages: [
                            ...state.state.messages,
                            {
                                type: "FROM_BOT",
                                id: data.autopilotResponse.id || genId(),
                                timestamp: new Date().toISOString(),
                                component: "TEXT",
                                data: {
                                    message: data.autopilotResponse.value.content,
                                }
                            }
                        ]
                    })
                }
                if (data.uiResponse) {
                    const uiVal = data.uiResponse.value;
                    state.setStatePartial({
                        messages: [
                            ...state.state.messages,
                            {
                                type: "FROM_BOT",
                                id: genId(),
                                timestamp: new Date().toISOString(),
                                component: uiVal.name,
                                data: uiVal.request_response,
                            }
                        ]
                    })
                }
            } else {
                const errorMessage = data.error?.message || "Unknown error occurred";
                state.setStatePartial({
                    messages: [
                        ...state.state.messages,
                        {
                            type: "FROM_BOT",
                            id: genId(),
                            component: "TEXT",
                            data: {
                                message: errorMessage,
                                variant: "error"
                            }
                        }
                    ]
                });
            }
            return true;
        } catch (error) {
            state.setStatePartial({
                error: {
                    hasError: true,
                    message: error instanceof Error ? error.message : 'Failed to send message',
                    code: 'MESSAGE_SEND_FAILED'
                }
            });
            return false;
        } finally {
            state.setStatePartial({
                loading: { isLoading: false, reason: null }
            });
        }
    };

    return {
        chatState: state,
        sessionState,
        sendMessage,
        createSession,
        clearSession,
        cleanup
    };
} 