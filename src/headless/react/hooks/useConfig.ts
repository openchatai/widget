import { useWidget } from "../WidgetProvider";

export function useConfig() {
  const { widgetCtx } = useWidget();

  return widgetCtx.config;
}
