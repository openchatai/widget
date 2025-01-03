import { createPubSub } from "../types/pub-sub"
import { WidgetSessionSchema } from "@core/types/schemas-v2"
import { MessageType } from "@core/types"

interface SessionState {
    currentSession: WidgetSessionSchema | null
    messages: MessageType[]
    keyboard: string[] | null
}

export function createSessionManager(initialSession?: WidgetSessionSchema) {
    const pubSub = createPubSub<SessionState>({
        currentSession: initialSession || null,
        messages: [],
        keyboard: null
    });

    return {
        get currentSession() {
            return pubSub.getState().currentSession;
        },
        pushMessage: (message: MessageType): void => {
            pubSub.setStatePartial({ messages: [...pubSub.getState().messages, message] });
        },
        pushMessages: (messages: MessageType[]): void => {
            pubSub.setStatePartial({ messages: [...pubSub.getState().messages, ...messages] });
        },
        appendMessages: (newMessages: MessageType[]): void => {
            pubSub.setStatePartial({ messages: [...pubSub.getState().messages, ...newMessages] });
        },
        getLastMessageTimestamp: (): string | undefined => {
            return pubSub.getState().messages.at(-1)?.timestamp;
        },
    };
}
