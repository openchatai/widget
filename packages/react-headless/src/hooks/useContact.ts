import { useWidget } from '../WidgetProvider';
import { usePrimitiveState } from './usePrimitiveState';

export function useContact() {
  const { widgetCtx } = useWidget();
  const contactState = usePrimitiveState(widgetCtx.contactCtx.state);

  return {
    contactState,
    createUnverifiedContact: widgetCtx.contactCtx.createUnverifiedContact,
  };
}
