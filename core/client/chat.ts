import { PubSub } from "../types/pub-sub";
import { MessageType, UserMessageType, SendMessageInput } from "../types";
import { ApiCaller } from "./api";
import { genId } from "../utils/genId";
import { WidgetHistorySchema, WidgetSessionSchema } from "../types/schemas-v2";

const SESSION_POLLING_INTERVAL = 10000; // every 10 seconds
const MESSAGE_POLLING_INTERVAL = 5000; // every 5 seconds

type ChatState = {
    lastUpdated: number | null;
    messages: MessageType[];
    keyboard: { options: string[] } | null;
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
        keyboard: null
    });

    const sessionState = new PubSub<WidgetSessionSchema | null>(null);

    // Start polling and get cleanup function
    const stopPolling = startPolling(options.api, sessionState, state);

    const sendMessage = async (input: {
        content: { text: string };
        attachments?: any[];
        id?: string;
        language?: string;
        user?: {
            external_id?: string;
            name?: string;
            email?: string;
            phone?: string;
            customData?: Record<string, string>;
            avatarUrl?: string;
        };
    }) => {
        const session = sessionState.getState();
        if (!session?.id) {
            throw new Error("No active session");
        }

        const messageId = input.id || genId();
        const userMessage: UserMessageType = {
            id: messageId,
            type: "FROM_USER",
            content: input.content.text,
            deliveredAt: null,
            attachments: input.attachments,
            user: input.user,
            timestamp: new Date().toISOString()
        };

        // Optimistically add message to state
        state.setStatePartial({
            messages: [...state.getState().messages, userMessage],
            keyboard: null
        });

        try {
            const response = await options.api.handleMessage({
                content: {
                    text: input.content.text
                },
                attachments: input.attachments,
                id: messageId,
                language: input.language,
                user: input.user
            });

            if (response) {
                // Update message with server response
                const updatedMessages = state.getState().messages.map(msg => {
                    if (msg.id === messageId) {
                        return {
                            ...msg,
                            deliveredAt: new Date().toISOString()
                        };
                    }
                    return msg;
                });

                state.setStatePartial({
                    messages: updatedMessages
                });

                return response;
            }
        } catch (error) {
            console.error("Error sending message:", error);
            throw error;
        }
    };

    const createSession = async () => {
        try {
            const response = await options.api.createSession();
            if (response) {
                sessionState.setState(response);
                return response;
            }
        } catch (error) {
            console.error("Error creating session:", error);
            throw error;
        }
        return null;
    };

    const clearSession = async () => {
        const session = sessionState.getState();
        if (!session?.id) return;

        try {
            // Since there's no closeSession in API, we'll just clear local state
            sessionState.setState(null);
            state.setState({
                lastUpdated: null,
                messages: [],
                keyboard: null
            });
            options.onSessionDestroy?.();
        } catch (error) {
            console.error("Error clearing session:", error);
            throw error;
        }
    };

    const cleanup = () => {
        stopPolling();
        state.clear();
        sessionState.clear();
    };

    return {
        state,
        sessionState,
        cleanup,
        sendMessage,
        createSession,
        clearSession,
        getState: () => state.getState(),
        getSession: () => sessionState.getState(),
    };
} 