import { ClientEmitter } from "@core/types/client-emitter"
import { AIClosureType, SessionStatus, ChatSessionType } from "../types/schemas"

export class SessionManager {

    constructor(
        private readonly clientEmitter: ClientEmitter
    ) {
    }

    private _currentSession: ChatSessionType | null = null

    static create({ session, clientEmitter }: {
        session: ChatSessionType
        clientEmitter: ClientEmitter
    }) {
        const sessionManager = new SessionManager(clientEmitter)
        sessionManager.setSession(session)
        return sessionManager
    }

    get currentSession() {
        return {
            ...this._currentSession,
            isSessionClosed: this._currentSession?.status !== SessionStatus.OPEN,
            isAssignedToAi: this._currentSession?.assignee_id === 555,
            isAssignedToHuman: this._currentSession?.assignee_id !== 555,
            isPendingHuman: this._currentSession?.assignee_id === 555 && this._currentSession?.ai_closure_type === AIClosureType.handed_off,
        }
    }

    setSession(session: ChatSessionType): void {
        this._currentSession = session
    }

    clearSession(): void {
        this._currentSession = null
    }

    get isSessionOpen(): boolean {
        return this._currentSession?.status === SessionStatus.OPEN
    }

}