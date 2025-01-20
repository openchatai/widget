import useSWR from "swr";
import { useWidget } from "../WidgetProvider";

function usePreludeData() {
  const { widgetCtx } = useWidget();

  // TODO remove swr dependency
  // TODO swr will call this function on page refocus.... get rid of it
  return useSWR([widgetCtx.config.token], widgetCtx.api.widgetPrelude);
}

export { usePreludeData };
