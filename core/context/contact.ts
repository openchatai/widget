import { PubSub } from "../PubSub";
import { ApiCaller } from "../api";
import { LoadingState, ErrorState } from "../types/helpers";
import { Dto } from "core/sdk";
import { WidgetConfig } from "core/types/WidgetConfig";

type ContactState = {
  contact: { token: string } | null;
  loading: LoadingState;
  error: ErrorState;
};

export type CreateContactHandlerOptions = {
  api: ApiCaller;
  config: WidgetConfig;
};

export class ContactCtx {
  private config: WidgetConfig;
  private api: ApiCaller;
  state: PubSub<ContactState>;

  constructor({ config, api }: CreateContactHandlerOptions) {
    this.config = config;
    this.api = api;

    this.state = new PubSub<ContactState>({
      contact: config.contactToken ? { token: config.contactToken } : null,
      loading: { isLoading: false, reason: null },
      error: { hasError: false },
    });
  }

  shouldCollectData = (): boolean => {
    const currentState = this.state.getState();

    if (!currentState.contact?.token && this.config.collectUserData) {
      return true;
    } else {
      return false;
    }
  };

  createUnauthenticatedContact = async (
    payload: Dto["CreateContactDto"],
  ): Promise<Dto["WidgetContactTokenResponseDto"] | null> => {
    this.state.setStatePartial({
      loading: { isLoading: true, reason: "creating_unauthenticated_contact" },
      error: { hasError: false },
    });

    const { data, error } = await this.api.createContact(payload);
    if (data?.token) {
      this.state.setStatePartial({
        contact: { token: data.token },
      });
      this.api.setAuthToken(data.token);
      return data;
    }

    if (error) {
      this.state.setStatePartial({
        loading: { isLoading: false, reason: null },
        error: {
          hasError: true,
          message: error?.message,
          code: "CONTACT_CREATION_FAILED",
        },
      });
    }

    return null;
  };
}
