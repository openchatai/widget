import { useMessages } from '../../../headless/react';
import { useIsSmallScreen } from './useIsSmallScreen';
import { useModes } from '../../../headless/react';

export function useCanvas() {
  const {
    messagesState: { isInitialFetchLoading },
  } = useMessages();
  const { isSmallScreen } = useIsSmallScreen();
  const { activeMode } = useModes();

  const isCanvasOpen = !isInitialFetchLoading && !isSmallScreen && !!activeMode;

  return {
    isCanvasOpen,
  };
}
