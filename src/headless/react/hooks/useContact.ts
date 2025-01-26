import { useWidget } from "../WidgetProvider";
import { usePubsub } from "./usePubsub";

export function useContact() {
  const { widgetCtx } = useWidget();
  const contactState = usePubsub(widgetCtx.contactCtx.state);
  const { state, ...contactCtx } = widgetCtx.contactCtx;

  return {
    contactState,
    contactCtx,
  };
}
