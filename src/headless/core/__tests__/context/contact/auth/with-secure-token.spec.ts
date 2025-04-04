import '../../../api-caller.mock';

import { ApiCaller } from '../../../../api/api-caller';
import { WidgetCtx } from '../../../../context/widget.ctx';
import { TestUtils } from '../../../test-utils';

suite('', () => {
  test('', async () => {
    expect(ApiCaller.prototype.createUnverifiedContact).toBeCalledTimes(0);
    const widgetCtx = await WidgetCtx.initialize({
      config: { token: '', user: { token: 'xyz', externalId: 'abc' } },
    });

    expect(widgetCtx.contactCtx.shouldCollectData()).toBeFalsy();
    expect(widgetCtx.contactCtx.state.get().contact?.token).toBe('xyz');
    expect(widgetCtx.contactCtx.state.get().contact?.externalId).toBe('abc');

    await TestUtils.sleep(100);

    expect(ApiCaller.prototype.createUnverifiedContact).toBeCalledTimes(0);
    expect(widgetCtx.contactCtx.state.get().contact?.token).toBe('xyz');
    expect(widgetCtx.contactCtx.state.get().contact?.externalId).toBe('abc');
  });
});
