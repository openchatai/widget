import { useEffect } from 'react';
import { useIsSmallScreen } from './useIsSmallScreen';
import { useWidget } from '../../../headless/react';

export function useSetWidgetSizeFn() {
  const { contentIframeRef } = useWidget();

  return {
    setWidth: (width: string) => {
      contentIframeRef?.current?.style.setProperty(
        '--opencx-widget-width',
        width,
      );
    },
    setHeight: (height: string) => {
      contentIframeRef?.current?.style.setProperty(
        '--opencx-widget-height',
        height,
      );
    },
  };
}

export function useSetWidgetSize({
  width,
  height,
}: {
  width?: string;
  height?: string;
}) {
  const { isSmallScreen } = useIsSmallScreen();
  const { setWidth, setHeight } = useSetWidgetSizeFn();

  useEffect(() => {
    if (width) setWidth(width);

    if (height) setHeight(height);
  }, [isSmallScreen, height, width, setWidth, setHeight]);
}
