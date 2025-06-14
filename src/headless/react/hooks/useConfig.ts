import { useWidget } from '../WidgetProvider';

export function useConfig() {
  const { config } = useWidget();

  return config;
}
