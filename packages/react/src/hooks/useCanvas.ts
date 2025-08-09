import { useMessages } from '@opencx/widget-react-headless';
import { useIsSmallScreen } from './useIsSmallScreen';
import { useModes } from '@opencx/widget-react-headless';

export function useCanvas() {
  const {
    messagesState: { isInitialFetchLoading },
  } = useMessages();
  const { isSmallScreen } = useIsSmallScreen();
  const { activeMode, Component } = useModes();

  const isCanvasOpen =
    !isInitialFetchLoading && !isSmallScreen && !!activeMode && !!Component;

  return {
    isCanvasOpen,
  };
}
