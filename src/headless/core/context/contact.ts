import { PubSub } from "../utils/PubSub";
import { ApiCaller } from "../api";
import { Dto } from "src/headless/core/sdk";
import { WidgetConfig } from "src/headless/core/types/WidgetConfig";

type ContactState = {
  contact: { token: string } | null;
  isCreatingUnverifiedContact: boolean;
  isErrorCreatingUnverifiedContact: boolean;
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
      isCreatingUnverifiedContact: false,
      isErrorCreatingUnverifiedContact: false,
    });
  }

  shouldCollectData = (): boolean => {
    const currentState = this.state.get();

    if (!currentState.contact?.token && this.config.collectUserData) {
      return true;
    } else {
      return false;
    }
  };

  createUnverifiedContact = async (
    payload: Dto["CreateContactDto"],
  ): Promise<void> => {
    try {
      this.state.setPartial({
        isCreatingUnverifiedContact: true,
        isErrorCreatingUnverifiedContact: false,
      });

      const { data } = await this.api.createUnverifiedContact(payload);
      if (data?.token) {
        this.state.setPartial({ contact: { token: data.token } });
        this.api.setAuthToken(data.token);
      } else {
        this.state.setPartial({ isErrorCreatingUnverifiedContact: true });
      }
    } finally {
      this.state.setPartial({ isCreatingUnverifiedContact: false });
    }
  };
}
