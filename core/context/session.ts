import { ApiCaller } from "core/api";
import { PubSub } from "core/PubSub";
import { SessionDto } from "core/types";
import { MessageUtils } from "core/utils/message";
import { ChatState, POLLING_INTERVALS_MS } from "./chat";

export class SessionCtx {
  private api: ApiCaller;
  private chatState: PubSub<ChatState>;

  public sessionState = new PubSub<SessionDto | null>(null);

  constructor({
    api,
    chatState,
  }: {
    api: ApiCaller;
    chatState: PubSub<ChatState>;
  }) {
    this.api = api;
    this.chatState = chatState;
  }

  stopPolling: (() => void) | null = null;

  /**
   * Starts polling for the session and messages
   */
  startPolling = () => {
    if (this.stopPolling) return;

    const intervals: NodeJS.Timeout[] = [];

    // Poll session
    intervals.push(
      setInterval(async () => {
        const session = this.sessionState.getState();
        if (!session?.id) return;

        try {
          const now = new Date();
          this.chatState.setStatePartial({
            polling: {
              ...this.chatState.getState().polling,
              session: {
                isPolling: true,
                lastPollTime: now.toISOString(),
                nextPollTime: new Date(
                  now.getTime() + POLLING_INTERVALS_MS.SESSION,
                ).toISOString(),
                error: { hasError: false },
              },
            },
          });

          const { data } = await this.api.getSession(session.id);
          if (data) {
            this.sessionState.setState(data);
          }

          this.chatState.setStatePartial({
            polling: {
              ...this.chatState.getState().polling,
              session: {
                ...this.chatState.getState().polling.session,
                isPolling: false,
              },
            },
          });
        } catch (error) {
          this.chatState.setStatePartial({
            polling: {
              ...this.chatState.getState().polling,
              session: {
                ...this.chatState.getState().polling.session,
                isPolling: false,
                error: {
                  hasError: true,
                  message:
                    error instanceof Error
                      ? error.message
                      : "Failed to poll session",
                  code: "SESSION_POLLING_FAILED",
                },
              },
            },
          });
        }
      }, POLLING_INTERVALS_MS.SESSION),
    );

    // Poll messages
    intervals.push(
      setInterval(async () => {
        const session = this.sessionState.getState();
        if (!session?.id) return;
        try {
          const now = new Date();
          this.chatState.setStatePartial({
            polling: {
              ...this.chatState.getState().polling,
              messages: {
                isPolling: true,
                lastPollTime: now.toISOString(),
                nextPollTime: new Date(
                  now.getTime() + POLLING_INTERVALS_MS.MESSAGES,
                ).toISOString(),
                error: { hasError: false },
              },
            },
          });

          const newMessages = await MessageUtils.fetchHistoryMessages({
            sessionId: session.id,
            api: this.api,
            prevMessages: this.chatState.getState().messages,
          });

          this.chatState.setStatePartial({
            messages: [...this.chatState.getState().messages, ...newMessages],
            polling: {
              ...this.chatState.getState().polling,
              messages: {
                ...this.chatState.getState().polling.messages,
                isPolling: false,
              },
            },
          });
        } catch (error) {
          this.chatState.setStatePartial({
            polling: {
              ...this.chatState.getState().polling,
              messages: {
                ...this.chatState.getState().polling.messages,
                isPolling: false,
                error: {
                  hasError: true,
                  message:
                    error instanceof Error
                      ? error.message
                      : "Failed to poll messages",
                  code: "MESSAGES_POLLING_FAILED",
                },
              },
            },
          });
        }
      }, POLLING_INTERVALS_MS.MESSAGES),
    );

    this.stopPolling = () => {
      intervals.forEach(clearInterval);
      // Reset polling states
      this.chatState.setStatePartial({
        polling: {
          session: {
            isPolling: false,
            lastPollTime: null,
            nextPollTime: null,
            error: { hasError: false },
          },
          messages: {
            isPolling: false,
            lastPollTime: null,
            nextPollTime: null,
            error: { hasError: false },
          },
        },
      });
    };
  };

  /**
   * Creates a new session
   * @returns The session
   */
  createSession = async () => {
    this.chatState.setStatePartial({
      loading: { isLoading: true, reason: "creating_session" },
      error: { hasError: false },
    });

    const { data: session, error } = await this.api.createSession();
    if (session) {
      this.sessionState.setState(session);
      this.chatState.setStatePartial({
        loading: { isLoading: false, reason: null },
      });
      this.startPolling();
      return session;
    }

    const errorState = {
      hasError: true,
      message:
        error instanceof Error ? error.message : "Failed to create session",
      code: "SESSION_CREATION_FAILED" as const,
    };
    this.chatState.setStatePartial({
      error: errorState,
      loading: { isLoading: false, reason: null },
    });
    return null;
  };

  /**
   * Clears the session and stops polling
   */
  clear = async () => {
    try {
      if (this.stopPolling) {
        this.stopPolling();
        this.stopPolling = null;
      }
      this.sessionState.reset();
      this.chatState.reset();
    } catch (error) {
      this.chatState.setStatePartial({
        error: {
          hasError: true,
          message:
            error instanceof Error ? error.message : "Failed to clear session",
          code: "SESSION_CLEAR_FAILED",
        },
      });
    }
  };

  /**
   * Fetches the session from the API
   * @param id - The ID of the session to fetch
   * @returns The session
   */
  fetch = async (id: string) => {
    return this.api.getSession(id);
  };

  /**
   * Refetches the session and updates the state
   */
  refetch = async () => {
    const session = this.sessionState.getState();
    if (!session?.id) return;
    const { data: newSession } = await this.fetch(session.id);
    if (newSession) {
      this.sessionState.setState(newSession);
    }
    return newSession;
  };
}
