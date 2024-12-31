import { PubSub } from "../types/pub-sub"
import { MessageType } from "../types/messages"
import { WidgetHistorySchema } from "@core/types/schemas-v2"
import { genId } from "../utils/genId"

interface ChatHistoryEvents {
    "history:message:added": MessageType
    "history:message:updated": MessageType
    "history:updated": MessageType[]
    "history:cleared": void
}

interface ChatHistoryState {
    messages: MessageType[]
    keyboard: string[] | null
}

export class ChatHistoryManager extends PubSub<ChatHistoryEvents> {
    #state: ChatHistoryState = {
        messages: [],
        keyboard: null
    }
    #lastUpdated: number | null = null

    constructor() {
        super();
    }

    private updateTimestamp(): void {
        this.#lastUpdated = Date.now();
    }

    private setState(state: Partial<ChatHistoryState>): void {
        this.#state = {
            ...this.#state,
            ...state
        };
        this.notifyHistoryUpdate();
    }

    private pushMessage(message: MessageType): void {
        this.#state.messages.push(message);
        this.updateTimestamp();
        this.publish('history:message:added', message);
    }

    private notifyHistoryUpdate(): void {
        this.publish('history:updated', [...this.#state.messages]);
    }

    private handleNewMessage(message: MessageType): void {
        this.pushMessage(message);
    }

    public addMessage(message: MessageType): void {
        this.handleNewMessage(message);
    }

    public addMessages(messages: MessageType[]): void {
        messages.forEach(msg => this.handleNewMessage(msg));
    }
    
    public updateMessage(messageId: string, updates: Partial<MessageType>): void {
        const index = this.#state.messages.findIndex(msg => msg.id === messageId);
        if (index !== -1) {
            const currentMessage = this.#state.messages[index];
            const updatedMessage = {
                ...currentMessage,
                ...updates,
                type: currentMessage.type
            } as MessageType;

            this.#state.messages[index] = updatedMessage;
            this.updateTimestamp();
            this.publish('history:message:updated', updatedMessage);
            this.notifyHistoryUpdate();
        }
    }

    public setMessages(messages: MessageType[]): void {
        this.setState({ messages });
    }

    public appendMessages(newMessages: MessageType[]): void {
        const existingIds = new Set(this.#state.messages.map(m => m.id));
        const messagesToAdd = newMessages.filter(msg => !existingIds.has(msg.id));

        if (messagesToAdd.length > 0) {
            messagesToAdd.forEach(msg => {
                this.publish('history:message:added', msg);
            });
            this.#state.messages.push(...messagesToAdd);
            this.updateTimestamp();
            this.notifyHistoryUpdate();
        }
    }

    public getMessages(): readonly MessageType[] {
        return this.#state.messages;
    }

    public getLastMessageTimestamp(): string | undefined {
        return this.#state.messages.at(-1)?.timestamp;
    }

    public getLastUpdated(): number | null {
        return this.#lastUpdated;
    }

    public isEmpty(): boolean {
        return this.#state.messages.length === 0;
    }

    public reset(): void {
        this.setState({ messages: [] });
        this.#lastUpdated = null;
        this.publish('history:cleared', void 0);
        this.notifyHistoryUpdate();
    }

    protected cleanup(): void {
        this.setState({ messages: [] });
        this.#lastUpdated = null;
        this.clear();
    }

    static mapServerHistoryToWidgethistory(historyMessages: WidgetHistorySchema[]): MessageType[] {
        return historyMessages.map(msg => {
            if (msg.sender.kind === "user") {
                return {
                    type: "FROM_USER",
                    content: msg.content.text || "",
                    id: msg.publicId || genId(),
                    deliveredAt: msg.sentAt?.toISOString() || "",
                    attachments: msg.attachments || []
                };
            }

            if (["ai", "agent"].includes(msg.sender.kind)) {
                return {
                    type: "FROM_BOT",
                    component: "TEXT",
                    data: {
                        message: msg.content.text || "",
                    },
                    id: msg.publicId || genId(),
                    attachments: msg.attachments || []
                };
            }

            throw new Error(`Unknown sender kind: ${msg.sender.kind}`);
        });
    }

    public clearChat(): void {
        this.#state = {
            keyboard: null,
            messages: []
        }
    }
}
