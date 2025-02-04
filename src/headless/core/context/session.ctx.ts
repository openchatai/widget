import type { ApiCaller } from "../api";
import type { SessionDto } from "../types/schemas";
import type { WidgetConfig } from "../types/widget-config";
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
  didStartInitialFetch: boolean;
  isInitialFetchLoading: boolean;
};

export class SessionCtx {
  private config: WidgetConfig;
  private api: ApiCaller;
  private contactCtx: ContactCtx;
  private activeSessionPoller = new Poller();
  private sessionsRefresher = new Poller();

  public sessionState = new PrimitiveState<SessionState>({
    session: null,
    isCreatingSession: false,
  });
  public sessionsState = new PrimitiveState<SessionsState>({
    data: [],
    cursor: undefined,
    isLastPage: false,
    didStartInitialFetch: false,
    /**
     * Initialize this as `true` so it always starts loading until the first fetch is done
     */
    isInitialFetchLoading: true,
  });

  constructor({
    config,
    api,
    contactCtx,
  }: { config: WidgetConfig; api: ApiCaller; contactCtx: ContactCtx }) {
    this.config = config;
    this.api = api;
    this.contactCtx = contactCtx;

    this.registerActiveSessionPolling();
    this.registerInitialSessionsFetch();
  }

  /** Clears the session and stops polling */
  reset = async () => {
    // Reset the session only, leave sessions as-is
    this.sessionState.reset();
    // The poller should automatically reset, since we're subscribed to the session state, and whenever it's null, the poller resets... but just in case, let's reset it here as well
    this.activeSessionPoller.reset();
  };

  private registerActiveSessionPolling = () => {
    this.sessionState.subscribe(({ session }) => {
      if (session?.id) {
        this.activeSessionPoller.startPolling(async (abortSignal) => {
          const { data } = await this.api.getSession({
            sessionId: session.id,
            abortSignal,
          });
          data && this.sessionState.setPartial({ session: data });
        }, 1000);
      } else {
        this.activeSessionPoller.reset();
      }
    });
  };

  private registerInitialSessionsFetch = () => {
    const initialFetch = async () => {
      this.sessionsState.setPartial({ didStartInitialFetch: true });
      // Call this for the first time to get the first page of sessions
      await this.loadMoreSessions();
      this.sessionsState.setPartial({ isInitialFetchLoading: false });
    };

    // If the widget config was initially provided with a contact token, no state change would be triggered, so we just fetch
    if (
      this.contactCtx.state.get().contact?.token &&
      !this.sessionsState.get().didStartInitialFetch
    ) {
      initialFetch();
      this.registerSessionsRefresher();
    }

    // In other cases where auto authenticate is fired, the token would be eventually set in state, so we wait for it
    this.contactCtx.state.subscribe(({ contact }) => {
      if (contact?.token && !this.sessionsState.get().didStartInitialFetch) {
        initialFetch();
        this.registerSessionsRefresher();
      }
    });
  };

  private registerSessionsRefresher = () => {
    this.sessionsRefresher.startPolling(async () => {
      // Get the first page only (pass no `cursor`)
      const { data } = await this.getSessions({ cursor: undefined });
      if (!data) return;
      const sessions = [...data.items, ...this.sessionsState.get().data].filter(
        (s, i, self) => i === self.findIndex((_s) => s.id === _s.id),
      );
      this.sessionsState.setPartial({ data: sessions });
    }, 10000);
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

  /**
   * Let's keep this private for now until we figure out how to do paginated fetching in tandem with the interval refreshing
   */
  private loadMoreSessions = async () => {
    if (this.sessionsState.get().isLastPage) return;

    const { data } = await this.getSessions({
      cursor: this.sessionsState.get().cursor,
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

  private getSessions = async ({ cursor }: { cursor: string | undefined }) => {
    if (!this.contactCtx.state.get().contact?.token) return { data: null };

    return await this.api.getSessions({
      cursor,
      filters: this.config.user?.externalId
        ? {
            external_id: this.config.user.externalId,
          }
        : {},
    });
  };
}
