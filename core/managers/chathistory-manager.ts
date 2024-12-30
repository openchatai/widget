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

export class ChatHistoryManager extends PubSub<ChatHistoryEvents> {
    #messages: MessageType[] = []
    #lastUpdated: number | null = null

    constructor() {
        super();
    }

    private updateTimestamp(): void {
        this.#lastUpdated = Date.now();
    }

    private notifyHistoryUpdate(): void {
        this.publish('history:updated', [...this.#messages]);
    }

    private handleNewMessage(message: MessageType): void {
        this.#messages.push(message);
        this.updateTimestamp();
        this.publish('history:message:added', message);
        this.notifyHistoryUpdate();
    }

    public addMessage(message: MessageType): void {
        this.handleNewMessage(message);
    }

    public updateMessage(messageId: string, updates: Partial<MessageType>): void {
        const index = this.#messages.findIndex(msg => msg.id === messageId);
        if (index !== -1) {
            const currentMessage = this.#messages[index];
            const updatedMessage = {
                ...currentMessage,
                ...updates,
                type: currentMessage.type
            } as MessageType;

            this.#messages[index] = updatedMessage;
            this.updateTimestamp();
            this.publish('history:message:updated', updatedMessage);
            this.notifyHistoryUpdate();
        }
    }

    public setMessages(messages: MessageType[]): void {
        this.#messages = [...messages];
        this.updateTimestamp();
        this.notifyHistoryUpdate();
    }

    public appendMessages(newMessages: MessageType[]): void {
        const existingIds = new Set(this.#messages.map(m => m.id));
        const messagesToAdd = newMessages.filter(msg => !existingIds.has(msg.id));

        if (messagesToAdd.length > 0) {
            messagesToAdd.forEach(msg => {
                this.publish('history:message:added', msg);
            });
            this.#messages.push(...messagesToAdd);
            this.updateTimestamp();
            this.notifyHistoryUpdate();
        }
    }

    public getMessages(): readonly MessageType[] {
        return this.#messages;
    }

    public getLastMessageTimestamp(): string | undefined {
        return this.#messages.at(-1)?.timestamp;
    }

    public getLastUpdated(): number | null {
        return this.#lastUpdated;
    }

    public isEmpty(): boolean {
        return this.#messages.length === 0;
    }

    public reset(): void {
        this.#messages = [];
        this.#lastUpdated = null;
        this.publish('history:cleared', void 0);
        this.notifyHistoryUpdate();
    }

    protected cleanup(): void {
        this.#messages = [];
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
}
