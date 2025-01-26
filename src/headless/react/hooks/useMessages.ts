import { usePubsub } from "./usePubsub";
import { useWidget } from "../WidgetProvider";

export function useMessages() {
  const { widgetCtx } = useWidget();
  const messagesState = usePubsub(widgetCtx.messageCtx.state);
  const { state, ...messageCtx } = widgetCtx.messageCtx;

  return { messagesState, messageCtx };
}
