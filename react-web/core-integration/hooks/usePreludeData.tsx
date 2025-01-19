import useSWR from "swr";
import { useWidget } from "../WidgetProvider";

function usePreludeData() {
  const { widgetCtx } = useWidget();

  return useSWR([widgetCtx.config.token], widgetCtx.api.widgetPrelude);
}

export { usePreludeData };
