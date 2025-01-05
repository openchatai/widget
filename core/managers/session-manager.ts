import { EventMap, PubSub } from "../types/pub-sub";
import {
  AIClosureType,
  SessionStatus,
  ChatSessionType,
} from "../types/schemas";
import { ApiCaller } from "../client/api";

export type ChatSessionWithStatus = ChatSessionType & {
  isSessionClosed: boolean;
  isAssignedToAi: boolean;
  isAssignedToHuman: boolean;
  isPendingHuman: boolean;
};

/**
 * Events emitted by the SessionManager
 */
interface SessionEvents extends EventMap {
  "session:updated": ChatSessionType;
  "session:created": ChatSessionType;
  "session:closed": { sessionId: string };
  "session:error": { error: Error };
}

export class SessionManager extends PubSub<SessionEvents> {
  #currentSession: ChatSessionType | null = null;

  constructor(
    private readonly httpClient: ApiCaller,
    initialSession?: ChatSessionType,
  ) {
    super();
    if (initialSession) {
      this.setSession(initialSession);
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
      isPendingHuman:
        this.#currentSession.assignee_id === 555 &&
        this.#currentSession.ai_closure_type === AIClosureType.handed_off,
    };
  }

  setSession(session: ChatSessionType): void {
    this.#currentSession = session;
    this.publish("session:updated", session);
  }

  clearSession = (): void => {
    if (this.#currentSession) {
      const sessionId = this.#currentSession.id;
      this.#currentSession = null;
      this.publish("session:closed", { sessionId });
    }
  };

  async createSession(): Promise<ChatSessionType> {
    try {
      const session = await this.httpClient.createSession();
      this.setSession(session);
      this.publish("session:created", session);
      return session;
    } catch (error) {
      this.publish("session:error", { error: error as Error });
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
      this.publish("session:error", { error: error as Error });
      console.error("Failed to refresh session:", error);
    }
    return null;
  }

  protected cleanup(): void {
    this.#currentSession = null;
    this.clear();
  }
}
