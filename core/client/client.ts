import { CoreOptions } from "../types"
import { ApiCaller } from "./api"
import { PubSub, Subscribable } from "../types/pub-sub"
import { SessionManager } from "../managers/session-manager"
import { Platform, DefaultPlatform } from "../platform"
import { HttpTransport } from "../transport/http.transport"
import { MessagingTransport } from "../transport/transport"
import { MessageType, UserMessageType, BotMessageType, SendMessageInput } from "../types/messages"
import { genId } from "../utils/genId"
import { MessageData } from "../types/transport"
import { mapChatHistoryToMessage } from "../utils/history-to-widget-messages"

interface ClientEvents {
    "client:error": Error
}

export class ApiClient extends Subscribable {
    private messagingTransport!: MessagingTransport
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

        // Initialize transport
        this.initializeTransport();

        // Start polling and heartbeat
        this.startMessagePolling();
        this.startHeartbeat();
    }

    private startMessagePolling() {
        if (this.pollingInterval) {
            clearInterval(this.pollingInterval);
        }

        this.pollingInterval = setInterval(async () => {
            const session = this.session.currentSession;
            if (!session) return;

            const lastMessage = this.messages[this.messages.length - 1];
            if (!lastMessage?.timestamp) return;

            try {
                const response = await this.api.getMessages(session.id);
                if (response && response.length > 0) {
                    // Convert MessageData[] to ChatHistoryMessageType[]
                    const historyMessages = response.map(msg => ({
                        message: msg.content.text,
                        type: "message",
                        publicId: msg.id,
                        agent_avatar: null,
                        agent_id: null,
                        agent_name: null,
                        created_at: msg.timestamp,
                        from_user: false,
                        handoff_happened_during_office_hours: false,
                        session_id: msg.session_id,
                        updated_at: null,
                        attachments: msg.attachments
                    }));

                    this.appendMessages(mapChatHistoryToMessage(historyMessages));
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

    private appendMessages(messages: MessageType[]) {
        const newMessages = messages.filter(
            (msg) => !this.messages.some((m) => m.id === msg.id)
        );
        this.messages.push(...newMessages);
    }


    private handleIncomingMessage(message: MessageType): void {
        this.messages.push(message);
        this.refreshSession();
    }

    private async refreshSession() {
        const session = this.session.currentSession;
        if (session) {
            await this.session.getOrCreateSession();
        }
    }

    private initializeTransport() {
        const transportConfig = {
            api: this.api,
            sessionManager: this.session,
            coreOptions: this.options
        };

        if (this.options.transport === 'http') {
            this.messagingTransport = new HttpTransport(
                {
                    ...transportConfig,
                    pollingInterval: this.options.pollingInterval,
                },
                this.platform
            );
        }
    }

    public async sendMessage({ content, user, ...data }: SendMessageInput): Promise<void> {
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
        await this.messagingTransport.sendMessage({
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

    async connect(): Promise<void> {
        await this.messagingTransport.connect()
    }

    async disconnect(): Promise<void> {
        this.messagingTransport.disconnect()
    }

    setTransport(transport: MessagingTransport): void {
        this.messagingTransport.disconnect()
        this.messagingTransport = transport
        this.connect()
    }

    get state() {
        return {
            connected: this.messagingTransport.isConnected(),
            session: this.session.currentSession,
            messages: this.messages,
            keyboard: this.keyboard,
        }
    }

    protected cleanup(): void {
        if (this.pollingInterval) {
            clearInterval(this.pollingInterval);
        }
        if (this.heartbeatInterval) {
            clearInterval(this.heartbeatInterval);
        }
        this.messagingTransport.disconnect();
        this.session.clear();
        this.events.clear();
        this.messages = [];
        this.keyboard = null;
    }
}