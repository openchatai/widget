import type { ApiCaller } from "../api";
import type { Dto } from "../sdk";
import type { SessionDto } from "../types/schemas";
import type { WidgetConfig } from "../types/WidgetConfig";
import { Poller } from "../utils/Poller";
import { PrimitiveState } from "../utils/PrimitiveState";
import type { ContactCtx } from "./contact.ctx";

type SessionState = {
  /**
   * The currently selected session.
   * Can be null if no session is selected, or if in chat screen and the session is not created yet.
   */
  session: SessionDto | null;
  isCreatingSession: boolean;
};
type SessionsState = {
  /** List of all user sessions */
  data: SessionDto[];
  /** A cursor to get the next page of sessions */
  cursor: string | undefined;
  /** Indicates if no more pages are left */
  isLastPage: boolean;
  /** Did fetch for the first time */
  didInitialFetch: boolean;
};

export class SessionCtx {
  private config: WidgetConfig;
  private api: ApiCaller;
  private contactCtx: ContactCtx;
  private poller = new Poller();

  public sessionState = new PrimitiveState<SessionState>({
    session: null,
    isCreatingSession: false,
  });
  public sessionsState = new PrimitiveState<SessionsState>({
    data: [],
    cursor: undefined,
    isLastPage: false,
    didInitialFetch: false,
  });

  constructor({
    config,
    api,
    contactCtx,
  }: { config: WidgetConfig; api: ApiCaller; contactCtx: ContactCtx }) {
    this.config = config;
    this.api = api;
    this.contactCtx = contactCtx;

    this.registerPolling();
    this.registerInitialSessionsFetch();
  }

  /** Clears the session and stops polling */
  reset = async () => {
    // Reset the session only, leave sessions as-is
    this.sessionState.reset();
    // The poller should automatically reset, since we're subscribed to the session state, and whenever it's null, the poller resets... but just in case, let's reset it here as well
    this.poller.reset();
  };

  private registerPolling = () => {
    this.sessionState.subscribe(({ session }) => {
      if (session?.id) {
        this.poller.startPolling(async (abortSignal) => {
          const { data } = await this.api.getSession({
            sessionId: session.id,
            abortSignal,
          });
          data && this.sessionState.setPartial({ session: data });
        }, 1000);
      } else {
        this.poller.reset();
      }
    });
  };

  private registerInitialSessionsFetch = () => {
    this.contactCtx.state.subscribe(({ contact }) => {
      if (contact?.token && !this.sessionsState.get().didInitialFetch) {
        this.sessionsState.setPartial({ didInitialFetch: true });
        // Call this for the first time to get the first page of sessions
        this.loadMoreSessions();
      }
    });
  };

  createSession = async () => {
    this.sessionState.setPartial({ session: null, isCreatingSession: true });

    const { data: session, error } = await this.api.createSession({
      customData: this.config.user?.externalId
        ? {
            external_id: this.config.user?.externalId,
          }
        : undefined,
    });
    if (session) {
      this.sessionState.setPartial({ session, isCreatingSession: false });
      return session;
    }

    console.error("Failed to create session:", error);
    return null;
  };

  loadMoreSessions = async () => {
    if (this.sessionsState.get().isLastPage) return;
    if (!this.contactCtx.state.get().contact?.token) return;

    const { data } = await this.api.getSessions({
      cursor: this.sessionsState.get().cursor,
      filters: this.config.user?.externalId
        ? {
            external_id: this.config.user.externalId,
          }
        : {},
    });

    if (data) {
      const allSessions = [...this.sessionsState.get().data, ...data.items];
      // TODO sort by updated at
      const deduped = allSessions.filter(
        (s, i, self) => i === self.findIndex((_s) => s.id === _s.id),
      );

      this.sessionsState.setPartial({
        data: deduped,
        cursor: data.next || undefined,
        isLastPage: data.next === null,
      });
    }
  };
}
