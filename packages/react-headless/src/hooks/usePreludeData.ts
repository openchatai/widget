import useSWR from 'swr';
import { useWidget } from '../WidgetProvider';

function usePreludeData() {
  const { widgetCtx } = useWidget();

  // TODO remove swr dependency
  return useSWR([widgetCtx.config.token], widgetCtx.api.widgetPrelude, {
    revalidateOnFocus: false,
  });
}

export { usePreludeData };
