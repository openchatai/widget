import { useWidget } from "../WidgetProvider";
import { usePrimitiveState } from "./usePrimitiveState";

export function useSession() {
  const { widgetCtx } = useWidget();
  const sessionState = usePrimitiveState(widgetCtx.sessionCtx.sessionState);
  const sessionsState = usePrimitiveState(widgetCtx.sessionCtx.sessionsState);

  // Ignore non-reactive state from ctx
  const {
    sessionState: _ignored,
    sessionsState: _ignoredAsWell,
    ...sessionCtx
  } = widgetCtx.sessionCtx;

  return { sessionState, sessionsState, sessionCtx };
}
