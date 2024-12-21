import { ClientEmitter } from "../types/client-emitter"
import { AIClosureType, SessionStatus, ChatSessionType } from "../types/schemas"
import { ApiCaller } from "../client/api"

type ChatSessionWithStatus = ChatSessionType & {
    isSessionClosed: boolean
    isAssignedToAi: boolean
    isAssignedToHuman: boolean
    isPendingHuman: boolean
}

export class SessionManager {
    #currentSession: ChatSessionType | null = null
    constructor(
        private readonly clientEmitter: ClientEmitter,
        private readonly httpClient: ApiCaller
    ) {
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
}