import { useSessions, useWidget } from '..';

export function useModes() {
  const { widgetCtx } = useWidget();
  const { sessionState } = useSessions();

  const modes = widgetCtx.modes;
  const activeModeId = sessionState.session?.modeId;
  const activeMode = modes.find((mode) => mode.id === activeModeId);

  return {
    modes,
    activeMode,
  };
}
