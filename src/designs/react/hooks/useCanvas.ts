import { useMessages } from '../../../headless/react';
import { useIsSmallScreen } from './useIsSmallScreen';
import { useMode } from './useMode';

export function useCanvas() {
  const {
    messagesState: { isInitialFetchLoading },
  } = useMessages();
  const { isSmallScreen } = useIsSmallScreen();
  const { mode } = useMode();

  const isCanvasOpen = !isInitialFetchLoading && !isSmallScreen && !!mode;

  return {
    isCanvasOpen,
  };
}
