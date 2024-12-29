import { EventMap, PubSub } from "../types/pub-sub"
import { ApiCaller } from "../client/api-v2"
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

    constructor(
        private readonly httpClient: ApiCaller,
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

    setSession(session: WidgetSessionSchema): void {
        this.#currentSession = session;
        this.publish('session:updated', session);
    }

    clearSession = (): void => {
        if (this.#currentSession) {
            const sessionId = this.#currentSession.id;
            this.#currentSession = null;
            this.publish('session:closed', { sessionId });
        }
    }

    async createSession() {
        try {
            const session = await this.httpClient.createSession();
            this.setSession(session);
            this.publish('session:created', session);
            return session;
        } catch (error) {
            this.publish('session:error', { error: error as Error });
            throw error;
        }
    }

    async getOrCreateSession() {
        const session = this.currentSession;
        if (!session) {
            return this.createSession();
        }
        return session;
    }

    async refreshSession(sessionId: string) {
        try {
            const session = await this.httpClient.getSession(sessionId);
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
        this.#currentSession = null;
        this.clear();
    }
}
