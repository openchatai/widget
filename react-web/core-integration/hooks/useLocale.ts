import { useWidget } from "../WidgetProvider";

export function useLocale() {
  const { locale } = useWidget();
  return locale;
}
