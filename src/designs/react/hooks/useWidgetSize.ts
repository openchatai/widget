import { useEffect } from 'react';
import { useIsSmallScreen } from './useIsSmallScreen';

const SELECTOR = '[data-opencx-widget-content-root]' as const;

export function useWidgetSize({
  width,
  height,
}: {
  width?: string;
  height?: string;
}) {
  const { isSmallScreen } = useIsSmallScreen();

  useEffect(() => {
    const contentRoot = document.querySelector<HTMLElement>(SELECTOR);

    if (width) {
      contentRoot?.style.setProperty('--opencx-widget-width', width);
    }

    if (height) {
      contentRoot?.style.setProperty('--opencx-widget-height', height);
    }
  }, [isSmallScreen, height, width]);
}
