import { WidgetConfig } from "src/headless/core/types/WidgetConfig";
import { ApiCaller } from "../api";
import { ContactCtx } from "./contact";
import { MessageCtx } from "./message";
import { SessionCtx } from "./session";

export class WidgetCtx {
  public config: WidgetConfig;
  public api: ApiCaller;
  public contactCtx: ContactCtx;
  public sessionCtx: SessionCtx;
  public messageCtx: MessageCtx;

  constructor({ config }: { config: WidgetConfig }) {
    this.config = config;
    this.api = new ApiCaller({ config });

    this.contactCtx = new ContactCtx({
      api: this.api,
      config: this.config,
    });

    this.sessionCtx = new SessionCtx(this.api);
    this.messageCtx = new MessageCtx({
      config: this.config,
      api: this.api,
      sessionCtx: this.sessionCtx,
    });
  }

  resetChat = () => {
    this.sessionCtx.reset();
    this.messageCtx.reset();
  };
}
