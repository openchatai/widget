import type { ApiCaller } from "../api";
import type { Dto } from "../sdk";
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
          const { data } = await this.api.getSession({
            sessionId: session.id,
            abortSignal,
          });
          data && this.state.setPartial({ session: data });
        }, 1000);
      } else {
        this.poller.reset();
      }
    });
  };

  createSession = async (body: Dto['CreateWidgetChatSessionDto']) => {
    this.state.setPartial({ session: null, isCreatingSession: true });

    const { data: session, error } = await this.api.createSession(body);
    if (session) {
      this.state.setPartial({ session, isCreatingSession: false });
      return session;
    }

    console.error("Failed to create session:", error);
    return null;
  };
}
