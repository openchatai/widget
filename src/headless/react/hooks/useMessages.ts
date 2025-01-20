import { usePubsub } from "./usePubsub";
import { useWidget } from "../WidgetProvider";

export function useMessages() {
  const { widgetCtx } = useWidget();
  const messages = usePubsub(widgetCtx.messageCtx.state);

  return { messages, messageCtx: widgetCtx.messageCtx };
}
