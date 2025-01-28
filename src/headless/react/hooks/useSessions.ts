import { useWidget } from "../WidgetProvider";
import { usePrimitiveState } from "./usePrimitiveState";

export function useSessions() {
  const { widgetCtx } = useWidget();
  const sessionState = usePrimitiveState(widgetCtx.sessionCtx.sessionState);
  const sessionsState = usePrimitiveState(widgetCtx.sessionCtx.sessionsState);

  return {
    sessionState,
    sessionsState,
    loadMoreSessions: widgetCtx.sessionCtx.loadMoreSessions,
  };
}
