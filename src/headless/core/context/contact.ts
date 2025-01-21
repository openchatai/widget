import { PubSub } from "../utils/PubSub";
import { ApiCaller } from "../api";
import { type WidgetConfig } from "../types/WidgetConfig";
import { type Dto } from "../sdk";

type ContactState = {
  contact: { token: string } | null;
  isCreatingUnverifiedContact: boolean;
  isErrorCreatingUnverifiedContact: boolean;
};

export class ContactCtx {
  private config: WidgetConfig;
  private api: ApiCaller;
  state: PubSub<ContactState>;

  constructor({
    config,
    api,
  }: {
    api: ApiCaller;
    config: WidgetConfig;
  }) {
    this.config = config;
    this.api = api;

    this.state = new PubSub<ContactState>({
      contact: config.contactToken ? { token: config.contactToken } : null,
      isCreatingUnverifiedContact: false,
      isErrorCreatingUnverifiedContact: false,
    });

    if (!config.contactToken && !config.collectUserData) {
      this.autoCreateUnverifiedUser();
    }
  }

  shouldCollectData = (): boolean => {
    const currentState = this.state.get();

    if (!currentState.contact?.token && this.config.collectUserData) {
      return true;
    } else {
      return false;
    }
  };

  autoCreateUnverifiedUser = async () => {
    await this.createUnverifiedContact({
      name: this.config.user?.name || "Anonymous",
      email: this.config.user?.email,
    });
  };

  createUnverifiedContact = async (
    payload: Dto["CreateUnverifiedContactDto"],
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
