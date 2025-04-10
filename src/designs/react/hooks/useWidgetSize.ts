import { useEffect } from 'react';

const SELECTOR = '[data-opencx-widget-content-root]' as const;

export function useWidgetSize({
  width,
  height,
}: {
  width?: string;
  height?: string;
}) {
  useEffect(() => {
    const contentRoot = document.querySelector<HTMLElement>(SELECTOR);

    if (width) {
      contentRoot?.style.setProperty('--opencx-widget-width', width);
    }

    if (height) {
      contentRoot?.style.setProperty('--opencx-widget-height', height);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
