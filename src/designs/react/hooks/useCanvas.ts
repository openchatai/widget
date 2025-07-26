import { useMessages } from '../../../headless/react';
import { useIsSmallScreen } from './useIsSmallScreen';
import { useModes } from '../../../headless/react';

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
