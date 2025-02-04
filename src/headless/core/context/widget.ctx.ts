import { ApiCaller } from "../api";
import type { ExternalStorage } from "../types/external-storage";
import type { WidgetConfig } from "../types/widget-config";
import { ContactCtx } from "./contact.ctx";
import { MessageCtx } from "./message.ctx";
import { RouterCtx } from "./router.ctx";
import { SessionCtx } from "./session.ctx";
import { StorageCtx } from "./storage.ctx";

export class WidgetCtx {
  public config: WidgetConfig;
  public api: ApiCaller;

  public contactCtx: ContactCtx;
  public sessionCtx: SessionCtx;
  public messageCtx: MessageCtx;
  public routerCtx: RouterCtx;
  public storageCtx?: StorageCtx;

  constructor({
    config,
    storage,
  }: { config: WidgetConfig; storage?: ExternalStorage }) {
    this.config = config;
    this.api = new ApiCaller({ config });
    this.storageCtx = storage ? new StorageCtx({ storage }) : undefined;

    this.contactCtx = new ContactCtx({
      api: this.api,
      config: this.config,
      storageCtx: this.storageCtx,
    });

    this.sessionCtx = new SessionCtx({
      api: this.api,
      contactCtx: this.contactCtx,
    });

    this.messageCtx = new MessageCtx({
      config: this.config,
      api: this.api,
      sessionCtx: this.sessionCtx,
    });

    this.routerCtx = new RouterCtx({
      contactCtx: this.contactCtx,
      sessionCtx: this.sessionCtx,
      resetChat: this.resetChat,
    });
  }

  resetChat = () => {
    this.sessionCtx.reset();
    this.messageCtx.reset();
  };
}
