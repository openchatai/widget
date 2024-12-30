import { EventMap, PubSub } from "../types/pub-sub"
import { ApiCaller } from "../client/api"
import { WidgetSessionSchema } from "@core/types/schemas-v2"

/**
 * Events emitted by the SessionManager
 */
interface SessionEvents extends EventMap {
    "session:updated": WidgetSessionSchema
    "session:created": WidgetSessionSchema
    "session:closed": { sessionId: string }
    "session:error": { error: Error }
}

export class SessionManager extends PubSub<SessionEvents> {
    #currentSession: WidgetSessionSchema | null = null
    #refreshTimeout?: NodeJS.Timeout

    constructor(
        private readonly api: ApiCaller,
        initialSession?: WidgetSessionSchema
    ) {
        super();
        if (initialSession) {
            this.setSession(initialSession);
        }
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
}
