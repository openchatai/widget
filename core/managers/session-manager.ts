import { EventMap, PubSub } from "../types/pub-sub"
import { ApiCaller } from "../client/api"
import { WidgetSessionSchema } from "@core/types/schemas-v2"
import { ChatHistoryManager } from "./chathistory-manager"
import { genId } from "@core/utils/genId"
import { SendMessageInput, UserMessageType } from "@core/types"
import { RequiredOptions } from "@core/client"

/**
 * Events emitted by the SessionManager
 */
interface SessionEvents extends EventMap {
    "session:updated": WidgetSessionSchema
    "session:created": WidgetSessionSchema
    "session:closed": { sessionId: string }
    "session:error": { error: Error }
    "initilized": void
}

export class SessionManager extends PubSub<SessionEvents> {
    #currentSession: WidgetSessionSchema | null = null;
    #historyManager;
    #refreshTimeout?: NodeJS.Timeout
    private pollingInterval?: NodeJS.Timeout
    private heartbeatInterval?: NodeJS.Timeout
    private coreOptions: RequiredOptions
    constructor(
        private readonly api: ApiCaller,
        options: RequiredOptions,
        initialSession?: WidgetSessionSchema
    ) {
        super();
        if (initialSession) {
            this.setSession(initialSession);
        }
        this.coreOptions = options;
        this.#historyManager = new ChatHistoryManager();
        this.startMessagePolling();
        this.startHeartbeat();
        this.publish('initilized', void 0);
    }

    get currentSession() {
        return this.#currentSession;
    }

    private setSession(session: WidgetSessionSchema): void {
        this.#currentSession = session;
        this.publish('session:updated', session);
        this.scheduleRefresh();
    }

    private scheduleRefresh(): void {
        if (this.#refreshTimeout) {
            clearTimeout(this.#refreshTimeout);
        }

        this.#refreshTimeout = setTimeout(() => {
            if (this.#currentSession) {
                this.refreshSession(this.#currentSession.id).catch(error => {
                    this.publish('session:error', { error: error as Error });
                });
            }
        }, 5 * 60 * 1000); // Refresh every 5 minutes
    }

    public clearSession(): void {
        if (this.#currentSession) {
            const sessionId = this.#currentSession.id;
            this.#currentSession = null;
            if (this.#refreshTimeout) {
                clearTimeout(this.#refreshTimeout);
            }
            this.publish('session:closed', { sessionId });
        }
    }

    public async createSession(): Promise<WidgetSessionSchema> {
        try {
            const session = await this.api.createSession();
            this.setSession(session);
            this.publish('session:created', session);
            return session;
        } catch (error) {
            this.publish('session:error', { error: error as Error });
            throw error;
        }
    }

    public async getOrCreateSession(): Promise<WidgetSessionSchema> {
        if (!this.#currentSession) {
            return this.createSession();
        }
        return this.#currentSession;
    }

    public async refreshSession(sessionId: string): Promise<WidgetSessionSchema | null> {
        try {
            const session = await this.api.getSession(sessionId);
            if (session) {
                this.setSession(session);
                return session;
            }
        } catch (error) {
            this.publish('session:error', { error: error as Error });
            console.error('Failed to refresh session:', error);
        }
        return null;
    }

    protected cleanup(): void {
        if (this.#refreshTimeout) {
            clearTimeout(this.#refreshTimeout);
        }
        this.#currentSession = null;
        this.clear();
    }

    private startHeartbeat() {
        if (this.heartbeatInterval) {
            clearInterval(this.heartbeatInterval);
        }

        const sendHeartbeat = async () => {
            const session = this.#currentSession
            if (!session) return;
        };

        sendHeartbeat();
        this.heartbeatInterval = setInterval(sendHeartbeat, 50 * 1000);
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
                    this.#historyManager.addMessages(messages);
                }
            } catch (error) {
                console.error("Error polling messages:", error);
                this.publish('client:error', error as Error);
            }
        }, 20 * 1000);
    }

    get lastMessageTimestamp(){
        return this.#historyManager.getLastMessageTimestamp();
    }

    async getHistoryPooling() {
        const session = this.#currentSession
        if (!session) return;
        const lastMessageTimestamp = this.lastMessageTimestamp;
        const response = await this.api.getSessionHistory(session.id, lastMessageTimestamp);
        return response;
    }


    public async sendMessage({ content, user, ...data }: SendMessageInput) {
        const session = await this.getOrCreateSession();
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
        this.#historyManager.addMessage(message)

        // Send through transport
        return this.api.handleMessage({
            id: messageId,
            content: { text: content.text },
            session_id: session.id,
            bot_token: this.coreOptions.token,
            headers: this.coreOptions.headers,
            pathParams: this.coreOptions.pathParams,
            queryParams: this.coreOptions.queryParams,
            user,
            language: data.language ?? this.coreOptions.language,
            attachments: data.attachments,
            timestamp: new Date().toISOString()
        });
    }


}
