import { useEffect } from 'react';
import { useIsSmallScreen } from './useIsSmallScreen';
import { useWidget } from '../../../headless/react';

export function useWidgetSize({
  width,
  height,
}: {
  width?: string;
  height?: string;
}) {
  const { isSmallScreen } = useIsSmallScreen();
  const { contentIframeRef } = useWidget();

  useEffect(() => {
    if (width) {
      contentIframeRef?.current?.style.setProperty(
        '--opencx-widget-width',
        width,
      );
    }

    if (height) {
      contentIframeRef?.current?.style.setProperty(
        '--opencx-widget-height',
        height,
      );
    }
  }, [isSmallScreen, height, width, contentIframeRef]);
}
