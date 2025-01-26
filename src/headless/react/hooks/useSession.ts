import { useWidget } from "../WidgetProvider";
import { usePrimitiveState } from "./usePrimitiveState";

export function useSession() {
  const { widgetCtx } = useWidget();
  const sessionState = usePrimitiveState(widgetCtx.sessionCtx.state);
  const { state, ...sessionCtx } = widgetCtx.sessionCtx;

  return { sessionState, sessionCtx };
}
