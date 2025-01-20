import { useWidget } from "../WidgetProvider";
import { usePubsub } from "./usePubsub";

export function useSession() {
  const { widgetCtx } = useWidget();
  const session = usePubsub(widgetCtx.sessionCtx.state);

  return { session };
}
