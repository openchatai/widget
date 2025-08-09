import '../../api-caller.mock';

import { WidgetCtx } from '../../../context/widget.ctx';
import { TestUtils } from '../../test-utils';

suite.concurrent('ContactCtx.shouldCollectData', () => {
  it('Should be always false if not defined in config', async () => {
    const widgetCtx = await WidgetCtx.initialize({ config: { token: '' } });
    expect(widgetCtx.contactCtx.shouldCollectData()).toBeFalsy();
    // Wait until auto-create finishes
    await TestUtils.sleep(100);
    expect(widgetCtx.contactCtx.shouldCollectData()).toBeFalsy();
  });

  it('Should be always false if set to false in config', async () => {
    const widgetCtx = await WidgetCtx.initialize({
      config: { token: '', collectUserData: false },
    });
    expect(widgetCtx.contactCtx.shouldCollectData()).toBeFalsy();
    // Wait until auto-auth finishes
    await TestUtils.sleep(100);
    expect(widgetCtx.contactCtx.shouldCollectData()).toBeFalsy();
  });

  suite('if set to `true` in config', () => {
    it('Should remain `true` if no user is provided', async () => {
      const widgetCtx = await WidgetCtx.initialize({
        config: { token: '', collectUserData: true },
      });
      expect(widgetCtx.contactCtx.shouldCollectData()).toBeTruthy();

      // Wait until auto-auth finishes
      await TestUtils.sleep(100);
      expect(widgetCtx.contactCtx.shouldCollectData()).toBeTruthy();
    });

    it('Should be initially `false` and remain `false` if user token is provided', async () => {
      const widgetCtx = await WidgetCtx.initialize({
        config: {
          token: '',
          collectUserData: true,
          user: { token: 'some-token' },
        },
      });
      expect(widgetCtx.contactCtx.shouldCollectData()).toBeFalsy();

      // Wait until auto-auth finishes
      await TestUtils.sleep(100);
      expect(widgetCtx.contactCtx.shouldCollectData()).toBeFalsy();
    });

    it('Should become `false` after auto-auth (user data)', async () => {
      const widgetCtx = await WidgetCtx.initialize({
        config: {
          token: '',
          collectUserData: true,
          user: { data: { email: 'test@email.com' } },
        },
      });
      expect(widgetCtx.contactCtx.shouldCollectData()).toBeTruthy();

      // Wait until auto-auth finishes
      await TestUtils.sleep(100);
      expect(widgetCtx.contactCtx.shouldCollectData()).toBeFalsy();
    });

    it('Should become `false` after manual auth (user data)', async () => {
      const widgetCtx = await WidgetCtx.initialize({
        config: {
          token: '',
          collectUserData: true,
        },
      });
      expect(widgetCtx.contactCtx.shouldCollectData()).toBeTruthy();

      // Mimic inputting name and email
      await widgetCtx.contactCtx.createUnverifiedContact({
        email: 'test@email.com',
        non_verified_name: 'some-name',
      });

      expect(widgetCtx.contactCtx.shouldCollectData()).toBeFalsy();
    });
  });

  // TODO add tests for auth persistence when `storage` is provided to the widget context
});
