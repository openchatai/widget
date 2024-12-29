import { MessageType, UserMessageType } from "../types";
import { EventMap, PubSub } from "../types/pub-sub";
import { WidgetHistorySchema } from "@core/types/schemas-v2";
import { genId } from "@core/utils/genId";

/**
 * Events emitted by the ChatHistoryManager
 */
export interface ChatHistoryEvents extends EventMap {
    "history:message:added": MessageType
    "history:message:updated": MessageType
    "history:updated": MessageType[]
    "history:cleared": void
}

/**
 * Manages chat history and message operations.
 * Uses a strongly typed event system for history-related events.
 * 
 * @example
 * ```typescript
 * const history = new ChatHistoryManager();
 * 
 * // Subscribe to events
 * history.on('history:message:added', (message) => {
 *   console.log('New message:', message);
 * });
 * 
 * // Add messages
 * history.appendUserMessage({
 *   id: '123',
 *   type: 'FROM_USER',
 *   content: 'Hello'
 * });
 * ```
 */
export class ChatHistoryManager extends PubSub<ChatHistoryEvents> {
    private messages: MessageType[] = [];
    private lastUpdated: number | null = null;

    constructor() {
        super();
        this.messages = [];
        this.lastUpdated = null;
    }

    /**
     * Subscribe to history events
     * @param event Event name to subscribe to
     * @param callback Callback function to handle the event
     * @returns Unsubscribe function
     */
    public on<K extends keyof ChatHistoryEvents>(
        event: K,
        callback: (data: ChatHistoryEvents[K]) => void
    ): () => void {
        return this.subscribe(event, callback);
    }

    private handleNewMessage = (message: MessageType) => {
        this.messages.push(message);
        this.updateTimestamp();
        this.publish('history:message:added', message);
        this.notifyHistoryUpdate();
    };

    private handleHistoryUpdate = (messages: MessageType[]) => {
        this.messages = messages;
        this.updateTimestamp();
        this.notifyHistoryUpdate();
    };

    private notifyHistoryUpdate() {
        this.publish('history:updated', [...this.messages]); // Immutable copy
    }

    public addResponseMessage(message: MessageType) {
        this.handleNewMessage(message);
    }

    public appendUserMessage(message: UserMessageType) {
        this.handleNewMessage(message);
    }

    public prependHistory(historyMessages: MessageType[]) {
        const historyIds = historyMessages.map((msg) => msg.id);
        const filteredCurrentMessages = this.messages.filter(
            (msg) => !historyIds.includes(msg.id)
        );
        const newMessages = [...historyMessages, ...filteredCurrentMessages];
        this.handleHistoryUpdate(newMessages);
    }

    public setDeliveredAt(clientMessageId: string, deliveredAt: string) {
        const updatedMessages = this.messages.map(message => {
            if (message.type === "FROM_USER" && message.id === clientMessageId) {
                const updatedMessage = { ...message, deliveredAt };
                this.publish('history:message:updated', updatedMessage);
                return updatedMessage;
            }
            return message;
        });
        this.handleHistoryUpdate(updatedMessages);
    }

    public setMessages(messages: MessageType[]) {
        this.handleHistoryUpdate(messages);
    }

    public appendMessages(newMessages: MessageType[]) {
        const existingIds = new Set(this.messages.map(m => m.id));
        const messagesToAdd = newMessages.filter(msg => !existingIds.has(msg.id));

        if (messagesToAdd.length > 0) {
            messagesToAdd.forEach(msg => {
                this.publish('history:message:added', msg);
            });
            this.handleHistoryUpdate([...this.messages, ...messagesToAdd]);
        }
    }

    public reset() {
        this.messages = [];
        this.lastUpdated = null;
        this.publish('history:cleared', void 0);
        this.notifyHistoryUpdate();
    }

    public getMessages(): readonly MessageType[] {
        return this.messages;
    }

    public getLastUpdated(): number | null {
        return this.lastUpdated;
    }

    public getLastMessageTimestamp(): string | undefined {
        return this.messages[this.messages.length - 1]?.timestamp;
    }

    public isEmpty(): boolean {
        return this.messages.length === 0;
    }

    private updateTimestamp() {
        this.lastUpdated = Date.now();
    }

    protected cleanup(): void {
        this.messages = [];
        this.lastUpdated = null;
        this.clear();
    }

    static mapServerHistoryToWidgethistory(
        historyMessages: WidgetHistorySchema[]
    ): MessageType[] {
        let messages: MessageType[] = []
        for (const msg of historyMessages) {
            if (msg.sender.kind === "user") {
                messages.push({
                    type: "FROM_USER",
                    content: msg.content.text || "",
                    id: msg.publicId || genId(),
                    deliveredAt: msg.sentAt?.toISOString() || "",
                    attachments: msg.attachments || []
                })
            }

            else if (["ai", "agent"].includes(msg.sender.kind)) {
                messages.push({
                    type: "FROM_BOT",
                    component: "TEXT",
                    data: {
                        message: msg.content.text || "",
                    },
                    id: msg.publicId || genId(),
                    attachments: msg.attachments || []
                })
            }

            else {
                console.warn(`Unknown sender kind: ${msg.sender.kind}`);
            }
        }
        return messages;
    }
}
