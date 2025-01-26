import { ApiCaller } from "../api";
import type { WidgetConfig } from "../types/WidgetConfig";
import { ContactCtx } from "./contact.ctx";
import { MessageCtx } from "./message.ctx";
import { RouterCtx } from "./router.ctx";
import { SessionCtx } from "./session.ctx";

export class WidgetCtx {
  public config: WidgetConfig;
  public api: ApiCaller;
  public contactCtx: ContactCtx;
  public sessionCtx: SessionCtx;
  public messageCtx: MessageCtx;
  public routerCtx: RouterCtx;

  constructor({ config }: { config: WidgetConfig }) {
    this.config = config;
    this.api = new ApiCaller({ config });

    this.contactCtx = new ContactCtx({
      api: this.api,
      config: this.config,
    });

    this.sessionCtx = new SessionCtx({
      config: this.config,
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
