import { useWidget } from '../WidgetProvider';
import { useSessions } from './useSessions';

export function useModes() {
  const { widgetCtx, modesComponents } = useWidget();
  const { sessionState } = useSessions();

  const modes = widgetCtx.modes;
  const activeModeId = sessionState.session?.modeId;
  const activeMode = modes.find((mode) => mode.id === activeModeId);

  const Component = modesComponents?.find((modeComponent) =>
    [
      activeMode?.id || '',
      activeMode?.name?.toLowerCase() || '',
      activeMode?.slug?.toLowerCase() || '',
    ].includes(modeComponent.key.toLowerCase()),
  )?.component;

  return {
    modes,
    modesComponents,
    activeModeId,
    activeMode,
    Component,
  };
}
