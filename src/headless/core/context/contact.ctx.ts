import { PrimitiveState } from "../utils/PrimitiveState";
import { ApiCaller } from "../api";
import { type WidgetConfig } from "../types/widget-config";
import { type Dto } from "../sdk";
import type { StorageCtx } from "./storage.ctx";

type ContactState = {
  contact: { token: string } | null;
  isCreatingUnverifiedContact: boolean;
  isErrorCreatingUnverifiedContact: boolean;
};

export class ContactCtx {
  private config: WidgetConfig;
  private storageCtx?: StorageCtx;
  private api: ApiCaller;
  state: PrimitiveState<ContactState>;

  constructor({
    config,
    api,
    storageCtx,
  }: {
    api: ApiCaller;
    config: WidgetConfig;
    storageCtx?: StorageCtx;
  }) {
    this.config = config;
    this.storageCtx = storageCtx;
    this.api = api;

    this.state = new PrimitiveState<ContactState>({
      contact: config.user?.token ? { token: config.user?.token } : null,
      isCreatingUnverifiedContact: false,
      isErrorCreatingUnverifiedContact: false,
    });

    this.autoCreateUnverifiedUserIfNotExists();
  }

  shouldCollectData = (): boolean => {
    const currentState = this.state.get();

    if (!currentState.contact?.token && this.config.collectUserData) {
      return true;
    }
    return false;
  };

  private autoCreateUnverifiedUserIfNotExists = async () => {
    if (this.config.user?.token || this.config.collectUserData) {
      return;
    }

    await this.createUnverifiedContact({
      name: this.config.user?.data?.name || "Anonymous",
      email: this.config.user?.data?.email,
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
        this.api.setAuthToken(data.token);
        // Set token in state after setting the token in the api handler
        this.state.setPartial({ contact: { token: data.token } });
      } else {
        this.state.setPartial({ isErrorCreatingUnverifiedContact: true });
      }
    } finally {
      this.state.setPartial({ isCreatingUnverifiedContact: false });
    }
  };
}
