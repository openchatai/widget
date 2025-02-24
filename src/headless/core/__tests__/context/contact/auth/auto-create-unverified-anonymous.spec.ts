import "../../../api-caller.mock";

import { ApiCaller } from "../../../../api/api-caller";
import { WidgetCtx } from "../../../../context/widget.ctx";
import { TestUtils } from "../../../test-utils";

suite("", () => {
  test("", async () => {
    expect(ApiCaller.prototype.createUnverifiedContact).toBeCalledTimes(0);
    const widgetCtx = await WidgetCtx.initialize({ config: { token: "" } });

    expect(widgetCtx.contactCtx.shouldCollectData()).toBeFalsy();
    expect(widgetCtx.contactCtx.state.get().contact).toBeNull();

    await TestUtils.sleep(100);

    expect(ApiCaller.prototype.createUnverifiedContact).toBeCalledTimes(1);
    expect(widgetCtx.contactCtx.state.get().contact?.token).toBeDefined();
    expect(widgetCtx.contactCtx.state.get().contact?.token).toBeTruthy();
  });
});
