import { useWidget } from "../WidgetProvider";
import { usePubsub } from "./usePubsub";

export function useContact() {
  const { widgetCtx } = useWidget();
  const state = usePubsub(widgetCtx.contactCtx.state);

  return {
    state,
    contactCtx: widgetCtx.contactCtx,
  };
}
