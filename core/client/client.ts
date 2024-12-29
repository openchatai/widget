import { CoreOptions } from "../types"
import { PubSub, Subscribable } from "../types/pub-sub"
import { SessionManager } from "../managers/session-manager"
import { Platform, DefaultPlatform } from "../platform"
import { MessageType, UserMessageType, SendMessageInput } from "../types/messages"
import { genId } from "../utils/genId"
import { ApiCaller } from "./api-v2"
import { ChatHistoryManager } from "@core/managers/chathistory-manager"

interface ClientEvents {
    "client:error": Error
}

export class ApiClient extends Subscribable {
    private readonly options: Required<CoreOptions>
    private readonly api: ApiCaller
    private readonly session: SessionManager
    private readonly events = new PubSub<ClientEvents>()
    private messages: MessageType[] = []
    private keyboard: string[] | null = null
    private pollingInterval?: NodeJS.Timeout
    private heartbeatInterval?: NodeJS.Timeout

    constructor(
        options: CoreOptions,
        private readonly platform: Platform = new DefaultPlatform()
    ) {
        super();
        this.options = {
            ...options,
            apiUrl: options.apiUrl ?? "https://api-v2.opencopilot.so/backend",
            socketUrl: options.socketUrl ?? "https://api-v2.opencopilot.so",
            transport: options.transport ?? 'socket',
            pollingInterval: options.pollingInterval ?? 3000,
            headers: {
                "X-Bot-Token": options.token,
                ...options.headers,
            },
            queryParams: {},
            pathParams: {},
            bot: {},
            debug: false,
            language: "en",
            user: {},
        }

        this.api = new ApiCaller({
            apiUrl: this.options.apiUrl,
            token: this.options.token,
        })

        this.session = new SessionManager(this.api);

        // Start polling and heartbeat
        this.startMessagePolling();
        this.startHeartbeat();
    }

    private startMessagePolling() {
        if (this.pollingInterval) {
            clearInterval(this.pollingInterval);
        }

        this.pollingInterval = setInterval(async () => {
            try {
                const response = await this.getHistoryPooling();
                if (response && response.length > 0) {
                    const messages = ChatHistoryManager.mapServerHistoryToWidgethistory(response);
                    this.messages.push(...messages);
                }
            } catch (error) {
                console.error("Error polling messages:", error);
                this.events.publish('client:error', error as Error);
            }
        }, 20 * 1000);
    }

    private startHeartbeat() {
        if (this.heartbeatInterval) {
            clearInterval(this.heartbeatInterval);
        }

        const sendHeartbeat = async () => {
            const session = this.session.currentSession;
            if (!session) return;
        };

        sendHeartbeat();
        this.heartbeatInterval = setInterval(sendHeartbeat, 50 * 1000);
    }

    protected cleanup(): void {
        // 
    }

    get lastMessageTimestamp() {
        return this.messages.at(-1)?.timestamp;
    }

    private async refreshSession() {
        const session = this.session.currentSession;
        if (session) {
            await this.session.getOrCreateSession();
        }
    }

    public async sendMessage({ content, user, ...data }: SendMessageInput) {
        const session = await this.session.getOrCreateSession();
        const messageId = genId();

        const message: UserMessageType = {
            type: "FROM_USER",
            id: messageId,
            content: content.text,
            user,
            deliveredAt: null,
            attachments: data.attachments
        };

        // Add to local messages
        this.messages.push(message);

        // Clear keyboard if exists
        if (this.keyboard) {
            this.setKeyboard(null);
        }

        // Send through transport
        return this.api.handleMessage({
            id: messageId,
            content: { text: content.text },
            session_id: session.id,
            bot_token: this.options.token,
            headers: this.options.headers,
            pathParams: this.options.pathParams,
            queryParams: this.options.queryParams,
            user,
            language: data.language ?? this.options.language,
            attachments: data.attachments,
            timestamp: new Date().toISOString()
        });
    }

    public setKeyboard(options: string[] | null): void {
        this.keyboard = options;
    }

    public handleKeyboardOption(option: string): void {
        this.sendMessage({
            content: { text: option }
        });
        this.setKeyboard(null);
    }

    public getMessages(): readonly MessageType[] {
        return this.messages;
    }

    public clearChat(): void {
        this.messages = [];
        this.keyboard = null;
        this.session.clearSession();
    }

    async getHistoryPooling() {
        const session = this.session.currentSession;
        if (!session) return;
        const lastMessageTimestamp = this.lastMessageTimestamp;
        const response = await this.api.getSessionHistory(session.id, lastMessageTimestamp);
        return response;
    }
}