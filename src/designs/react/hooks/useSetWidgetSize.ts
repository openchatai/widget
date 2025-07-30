import { useEffect } from 'react';
import { useIsSmallScreen } from './useIsSmallScreen';
import { useConfig, useWidget } from '../../../headless/react';

export function useSetWidgetSizeFn() {
  const { contentIframeRef } = useWidget();
  const { inline } = useConfig();

  return {
    setWidth: (width: string) => {
      contentIframeRef?.current?.style.setProperty(
        '--opencx-widget-width',
        inline ? '100%' : width,
      );
    },
    setHeight: (height: string) => {
      contentIframeRef?.current?.style.setProperty(
        '--opencx-widget-height',
        inline ? '100%' : height,
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
