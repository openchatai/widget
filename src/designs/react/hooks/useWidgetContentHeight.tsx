import { useEffect, useRef } from 'react';
import { useWidget } from '../../../headless/react';

export function useWidgetContentHeight() {
  const { contentIframeRef } = useWidget();
  /**
   * This is the element that we will observe for height changes
   */
  const observedElementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const contentRoot = contentIframeRef?.current;

    if (contentRoot && observedElementRef.current) {
      const observedElement = observedElementRef.current;

      let animationFrame: number;
      const observer = new ResizeObserver(() => {
        animationFrame = requestAnimationFrame(() => {
          const height = observedElement.offsetHeight;
          contentRoot.style.setProperty(
            '--opencx-widget-height',
            `${height.toFixed(1)}px`,
          );
        });
      });
      observer.observe(observedElement);

      return () => {
        cancelAnimationFrame(animationFrame);
        observer.unobserve(observedElement);
      };
    }
  }, [contentIframeRef]);

  return { observedElementRef };
}
