import type { ApiCaller } from "../api";
import type { SessionDto } from "../types/schemas";
import { Poller } from "../utils/Poller";
import { PubSub } from "../utils/PubSub";

export class SessionCtx {
  private api: ApiCaller;
  private poller = new Poller();

  public state = new PubSub<{
    session: SessionDto | null;
    isCreatingSession: boolean;
  }>({
    session: null,
    isCreatingSession: false,
  });

  constructor(api: ApiCaller) {
    this.api = api;
    this.registerPolling();
  }

  /** Clears the session and stops polling */
  reset = async () => {
    this.state.reset();
    // The poller should automatically reset, since we're subscribed to the session state, and whenever it's null, the poller resets... but just in case, let's reset it here as well
    this.poller.reset();
  };

  registerPolling = () => {
    this.state.subscribe(({ session }) => {
      if (session?.id) {
        this.poller.startPolling(async (abortSignal) => {
          const { data } = await this.fetch(session.id, abortSignal);
          data && this.state.setPartial({ session: data });
        }, 1000);
      } else {
        this.poller.reset();
      }
    });
  };

  /**
   * Creates a new session
   * @returns The session
   */
  createSession = async () => {
    this.state.setPartial({ session: null, isCreatingSession: true });

    const { data: session, error } = await this.api.createSession();
    if (session) {
      this.state.setPartial({ session, isCreatingSession: false });
      return session;
    }

    console.error("Failed to create session:", error);
    return null;
  };

  /**
   * Fetches the session from the API
   * @param id - The ID of the session to fetch
   * @returns The session
   */
  fetch = async (sessionId: string, abortSignal: AbortSignal) => {
    return this.api.getSession({ sessionId, abortSignal });
  };
}
