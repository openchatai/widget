import { CoreOptions } from "../types"
import { PubSub, Subscribable } from "../types/pub-sub"
import { SessionManager } from "../managers/session-manager"
import { Platform, DefaultPlatform } from "../platform"
import { MessageType, UserMessageType, SendMessageInput } from "../types/messages"
import { genId } from "../utils/genId"
import { ApiCaller } from "./api"
import { ChatHistoryManager } from "@core/managers/chathistory-manager"

interface ClientEvents {
    "client:error": Error
}

type RequiredOptions = Required<Omit<CoreOptions, 'contactToken'>> & {
    contactToken: string | undefined | null
}

export class ApiClient extends Subscribable {
    private readonly _options: CoreOptions
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
        this._options = options;

        this.api = new ApiCaller({
            apiUrl: this.getOptions.apiUrl,
            token: this.getOptions.token,
            coreOptions: options,
        })

        this.session = new SessionManager(this.api);

        // Start polling and heartbeat
        this.startMessagePolling();
        this.startHeartbeat();
    }

    private get getOptions(): RequiredOptions {
        return {
            ...this._options,
            apiUrl: this._options.apiUrl ?? "https://api-v2.opencopilot.so/backend",
            socketUrl: this._options.socketUrl ?? "https://api-v2.opencopilot.so",
            transport: this._options.transport ?? 'socket',
            pollingInterval: this._options.pollingInterval ?? 3000,
            headers: {
                ...(this._options.headers ?? {}),
                "X-Bot-Token": this._options.token,
            },
            queryParams: this._options.queryParams ?? {},
            pathParams: this._options.pathParams ?? {},
            bot: this._options.bot ?? {},
            contactToken: this._options.contactToken,
            debug: this._options.debug ?? false,
            language: this._options.language ?? "en",
            user: this._options.user ?? {},
        }
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
            bot_token: this.getOptions.token,
            headers: this.getOptions.headers,
            pathParams: this.getOptions.pathParams,
            queryParams: this.getOptions.queryParams,
            user,
            language: data.language ?? this.getOptions.language,
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