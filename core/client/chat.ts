import { PubSub } from "../types/pub-sub";
import { MessageType, SendMessageInput } from "../types";
import { ApiCaller } from "./api";
import { genId } from "../utils/genId";
import { WidgetHistorySchema, WidgetSessionSchema } from "../types/schemas-v2";
import { LoadingState, ErrorState } from "../types/helpers";

const SESSION_POLLING_INTERVAL = 10000; // every 10 seconds
const MESSAGE_POLLING_INTERVAL = 5000; // every 5 seconds

type ChatState = {
    lastUpdated: number | null;
    messages: MessageType[];
    keyboard: { options: string[] } | null;
    loading: LoadingState;
    error: ErrorState;
};

type ChatOptions = {
    api: ApiCaller;
    persistSession?: boolean;
    useSoundEffects?: boolean;
    onSessionDestroy?: () => void;
};


function mapHistoryToMessage(history: WidgetHistorySchema): MessageType {
    if (history.sender.kind === 'user') {
        return {
            id: history.publicId || genId(),
            type: "FROM_USER",
            content: history.content.text || "",
            deliveredAt: history.sentAt?.toISOString() || null,
            attachments: history.attachments || undefined,
            timestamp: history.sentAt?.toISOString()
        };
    }

    return {
        id: history.publicId || genId(),
        type: "FROM_BOT",
        component: history.type,
        data: {
            text: history.content.text
        },
        timestamp: history.sentAt?.toISOString(),
        attachments: history.attachments || undefined
    };
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
            const session = sessionState.getState();
            if (!session?.id) return;

            try {
                const response = await api.getSessionHistory(session.id);
                if (response) {
                    const messages = response.map(mapHistoryToMessage);
                    state.setStatePartial({
                        messages,
                        lastUpdated: Date.now()
                    });
                }
            } catch (error) {
                console.error("Error polling messages:", error);
            }
        }, MESSAGE_POLLING_INTERVAL)
    );

    return () => intervals.forEach(clearInterval);
}

export function createChat(options: ChatOptions) {
    const state = new PubSub<ChatState>({
        lastUpdated: null,
        messages: [],
        keyboard: null,
        loading: { isLoading: false },
        error: { hasError: false }
    });

    const sessionState = new PubSub<WidgetSessionSchema | null>(null);
    let stopPolling: (() => void) | null = null;

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
            state.setState({
                lastUpdated: null,
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
            state.setState({
                lastUpdated: null,
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

    const sendMessage = async (input: SendMessageInput) => {
        let session = sessionState.getState();
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
                        id: input.id || genId(),
                        type: "FROM_USER",
                        content: input.content.text,
                        deliveredAt: new Date().toISOString(),
                        attachments: input.attachments,
                        timestamp: new Date().toISOString()
                    }
                ]
            });

            await options.api.handleMessage({
                ...input,
                session_id: session.id
            });
            return true;
        } catch (error) {
            console.error("Error sending message:", error);
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