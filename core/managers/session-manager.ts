import { AIClosureType, SessionStatus, ChatSessionType, ChatSessionWithStatus } from "../types/schemas"
import { ApiCaller } from "../client/api"
import { Subscribable } from "@core/types";


export class SessionManager extends Subscribable {
    #currentSession: ChatSessionType | null = null
    constructor(
        private readonly httpClient: ApiCaller
    ) {
        super();
    }

    get currentSession(): ChatSessionWithStatus | null {
        if (!this.#currentSession) {
            return null
        }
        return {
            ...this.#currentSession,
            isSessionClosed: this.#currentSession?.status !== SessionStatus.OPEN,
            isAssignedToAi: this.#currentSession?.assignee_id === 555,
            isAssignedToHuman: this.#currentSession?.assignee_id !== 555,
            isPendingHuman: this.#currentSession?.assignee_id === 555 && this.#currentSession?.ai_closure_type === AIClosureType.handed_off,
        }
    }

    setSession(session: ChatSessionType): void {
        this.#currentSession = session
    }

    clearSession(): void {
        this.#currentSession = null
    }

    async createSession(): Promise<ChatSessionType> {
        const session = await this.httpClient.createSession()
        this.setSession(session)
        return session
    }

    async getOrCreateSession(): Promise<ChatSessionType> {
        const session = this.currentSession
        if (!session) {
            return this.createSession()
        }
        return session
    }
    protected cleanup(): void {
        // TODO: cleanup session manager
    }
}