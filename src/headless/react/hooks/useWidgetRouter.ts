import { useWidget } from "../WidgetProvider";
import { usePrimitiveState } from "./usePrimitiveState";

export function useWidgetRouter() {
  const { widgetCtx } = useWidget();

  const routerState = usePrimitiveState(widgetCtx.routerCtx.state);

  return {
    routerState,
    toSessionsScreen: widgetCtx.routerCtx.toSessionsScreen,
    toChatScreen: widgetCtx.routerCtx.toChatScreen,
  };
}
