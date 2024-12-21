import { EventMap, PubSub, Subscribable } from "../types/pub-sub"
import { AIClosureType, SessionStatus, ChatSessionType } from "../types/schemas"
import { ApiCaller } from "../client/api"

export type ChatSessionWithStatus = ChatSessionType & {
    isSessionClosed: boolean
    isAssignedToAi: boolean
    isAssignedToHuman: boolean
    isPendingHuman: boolean
}

/**
 * Events emitted by the SessionManager
 */
export interface SessionEvents extends EventMap {
    "session:updated": ChatSessionType
    "session:created": ChatSessionType
    "session:closed": { sessionId: string }
    "session:error": { error: Error }
}

/**
 * Manages chat session lifecycle and state.
 * Uses a strongly typed event system for session-related events.
 * 
 * @example
 * ```typescript
 * const sessionManager = new SessionManager(httpClient);
 * 
 * // Subscribe to events
 * sessionManager.on('session:created', (session) => {
 *   console.log('New session:', session);
 * });
 * 
 * // Create a session
 * await sessionManager.createSession();
 * 
 * // Handle errors
 * sessionManager.on('session:error', ({ error }) => {
 *   console.error('Session error:', error);
 * });
 * ```
 */
export class SessionManager extends Subscribable {
    #currentSession: ChatSessionType | null = null
    private readonly events: PubSub<SessionEvents>

    constructor(
        private readonly httpClient: ApiCaller
    ) {
        super();
        this.events = new PubSub<SessionEvents>();
    }

    /**
     * Subscribe to session events
     * @param event Event name to subscribe to
     * @param callback Callback function to handle the event
     * @returns Unsubscribe function
     */
    public on<K extends keyof SessionEvents>(
        event: K,
        callback: (data: SessionEvents[K]) => void
    ): () => void {
        return this.events.subscribe(event, callback);
    }

    private handleSessionUpdate = (session: ChatSessionType) => {
        this.#currentSession = session;
        this.notifySessionUpdate();
    }

    private notifySessionUpdate() {
        if (this.#currentSession) {
            this.events.publish('session:updated', this.#currentSession);
        }
    }

    get currentSession(): ChatSessionWithStatus | null {
        if (!this.#currentSession) {
            return null;
        }
        return {
            ...this.#currentSession,
            isSessionClosed: this.#currentSession.status !== SessionStatus.OPEN,
            isAssignedToAi: this.#currentSession.assignee_id === 555,
            isAssignedToHuman: this.#currentSession.assignee_id !== 555,
            isPendingHuman: this.#currentSession.assignee_id === 555 && this.#currentSession.ai_closure_type === AIClosureType.handed_off,
        }
    }

    setSession(session: ChatSessionType): void {
        this.#currentSession = session;
        this.events.publish('session:updated', session);
    }

    clearSession = (): void => {
        if (this.#currentSession) {
            const sessionId = this.#currentSession.id;
            this.#currentSession = null;
            this.events.publish('session:closed', { sessionId });
        }
    }

    async createSession(): Promise<ChatSessionType> {
        try {
            const session = await this.httpClient.createSession();
            this.setSession(session);
            this.events.publish('session:created', session);
            return session;
        } catch (error) {
            this.events.publish('session:error', { error: error as Error });
            throw error;
        }
    }

    async getOrCreateSession(): Promise<ChatSessionType> {
        const session = this.currentSession;
        if (!session) {
            return this.createSession();
        }
        return session;
    }

    async refreshSession(sessionId: string): Promise<ChatSessionType | null> {
        try {
            const session = await this.httpClient.fetchSession(sessionId);
            if (session) {
                this.setSession(session);
                return session;
            }
        } catch (error) {
            this.events.publish('session:error', { error: error as Error });
            console.error('Failed to refresh session:', error);
        }
        return null;
    }

    protected cleanup(): void {
        this.#currentSession = null;
        this.events.clear();
    }
}
