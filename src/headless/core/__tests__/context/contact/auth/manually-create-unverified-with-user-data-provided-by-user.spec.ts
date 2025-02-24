import "../../../api-caller.mock";

import { ApiCaller } from "../../../../api/api-caller";
import { WidgetCtx } from "../../../../context/widget.ctx";
import { TestUtils } from "../../../test-utils";

suite("", () => {
  test("", async () => {
    const widgetCtx = await WidgetCtx.initialize({
      config: { token: "", collectUserData: true },
    });

    // Assert that the contact was not auto created
    await TestUtils.sleep(100);
    expect(ApiCaller.prototype.createUnverifiedContact).toBeCalledTimes(0);
    expect(widgetCtx.contactCtx.shouldCollectData()).toBeTruthy();
    expect(widgetCtx.contactCtx.state.get().contact).toBeNull();

    // Mimic user inputting a name and email
    await widgetCtx.contactCtx.createUnverifiedContact({
      name: "some-name",
      email: "test@email.com",
    });
    expect(ApiCaller.prototype.createUnverifiedContact).toBeCalledTimes(1);
    expect(widgetCtx.contactCtx.shouldCollectData()).toBeFalsy();
    expect(widgetCtx.contactCtx.state.get().contact?.token).toBeDefined();
  });
});
