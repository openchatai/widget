import { useWidget } from "../WidgetProvider";
import { usePubsub } from "./usePubsub";

export function useSession() {
  const { widgetCtx } = useWidget();
  const sessionState = usePubsub(widgetCtx.sessionCtx.state);
  const { state, ...sessionCtx } = widgetCtx.sessionCtx;

  return { sessionState, sessionCtx };
}
