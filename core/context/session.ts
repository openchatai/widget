import { ApiCaller } from "core/api";
import { SessionDto } from "core/types";
import { Poller } from "core/utils/Poller";
import { PubSub } from "core/utils/PubSub";

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
    this.poller.reset();
    this.state.reset();
  };

  registerPolling = () => {
    this.state.subscribe(({ session }) => {
      if (session?.id) {
        this.poller.startPolling(async () => {
          const { data } = await this.fetch(session.id);
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
  fetch = async (id: string) => {
    return this.api.getSession(id);
  };
}
