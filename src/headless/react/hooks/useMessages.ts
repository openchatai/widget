import { usePubsub } from "./usePubsub";
import { useWidget } from "../WidgetProvider";

export function useMessages() {
  const { widgetCtx } = useWidget();
  const messagesState = usePubsub(widgetCtx.messageCtx.state);

  return { messagesState, messageCtx: widgetCtx.messageCtx };
}
