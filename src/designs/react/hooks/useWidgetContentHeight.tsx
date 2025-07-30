import { useEffect, useRef } from 'react';
import { useConfig, useWidget } from '../../../headless/react';

export function useWidgetContentHeight() {
  const { contentIframeRef } = useWidget();
  const { inline } = useConfig();
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
            inline ? '100%' : `${height.toFixed(1)}px`,
          );
        });
      });
      observer.observe(observedElement);

      return () => {
        cancelAnimationFrame(animationFrame);
        observer.unobserve(observedElement);
      };
    }
  }, [contentIframeRef, inline]);

  return { observedElementRef };
}
