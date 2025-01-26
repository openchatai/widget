import { useWidget } from "../WidgetProvider";
import { usePrimitiveState } from "./usePrimitiveState";

export function useContact() {
  const { widgetCtx } = useWidget();
  const contactState = usePrimitiveState(widgetCtx.contactCtx.state);
  const { state, ...contactCtx } = widgetCtx.contactCtx;

  return {
    contactState,
    contactCtx,
  };
}
