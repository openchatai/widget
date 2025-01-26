import { usePrimitiveState } from "./usePrimitiveState";
import { useWidget } from "../WidgetProvider";

export function useMessages() {
  const { widgetCtx } = useWidget();
  const messagesState = usePrimitiveState(widgetCtx.messageCtx.state);

  const {
    // Ignore non-reactive state from ctx
    state,
    ...messageCtx
  } = widgetCtx.messageCtx;

  return { messagesState, messageCtx };
}
