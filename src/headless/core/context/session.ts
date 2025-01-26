import type { ApiCaller } from "../api";
import type { Dto } from "../sdk";
import type { SessionDto } from "../types/schemas";
import type { WidgetConfig } from "../types/WidgetConfig";
import { Poller } from "../utils/Poller";
import { PubSub } from "../utils/PubSub";
import type { ContactCtx } from "./contact";

type SessionCtxState = {
  /** The currently selected session */
  session: SessionDto | null;
  sessions: {
    /** List of all user sessions */
    data: SessionDto[];
    /** A cursor to get the next page of sessions */
    cursor: string | undefined;
    /** Indicates if no more pages are left */
    isLastPage: boolean;
    /** Did fetch for the first time */
    didInitialFetch: boolean;
  };
  isCreatingSession: boolean;
};

export class SessionCtx {
  private config: WidgetConfig;
  private api: ApiCaller;
  private contactCtx: ContactCtx;
  private poller = new Poller();

  public state = new PubSub<SessionCtxState>({
    session: null,
    sessions: {
      data: [],
      cursor: undefined,
      isLastPage: false,
      didInitialFetch: false,
    },
    isCreatingSession: false,
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

  registerInitialSessionsFetch = () => {
    this.contactCtx.state.subscribe(({ contact }) => {
      if (contact?.token && !this.state.get().sessions.didInitialFetch) {
        this.state.setPartial({
          sessions: {
            ...this.state.get().sessions,
            didInitialFetch: true,
          },
        });
        // Call this for the first time to get the first page of sessions
        this.loadMoreSessions();
      }
    });
  };

  createSession = async () => {
    this.state.setPartial({ session: null, isCreatingSession: true });

    const { data: session, error } = await this.api.createSession({
      customData: this.config.user?.externalId
        ? {
            external_id: this.config.user?.externalId,
          }
        : undefined,
    });
    if (session) {
      this.state.setPartial({ session, isCreatingSession: false });
      return session;
    }

    console.error("Failed to create session:", error);
    return null;
  };

  loadMoreSessions = async () => {
    if (this.state.get().sessions.isLastPage) return;
    if (!this.contactCtx.state.get().contact?.token) return;

    const { data } = await this.api.getSessions({
      cursor: this.state.get().sessions.cursor,
      filters: this.config.user?.externalId
        ? {
            external_id: this.config.user.externalId,
          }
        : {},
    });

    if (data) {
      const allSessions = [...this.state.get().sessions.data, ...data.items];
      const deduped = allSessions.filter(
        (s, i, self) => i === self.findIndex((_s) => s.id === _s.id),
      );

      this.state.setPartial({
        sessions: {
          ...this.state.get().sessions,
          data: deduped,
          cursor: data.next || undefined,
          isLastPage: data.next === null,
        },
      });
    }
  };
}
