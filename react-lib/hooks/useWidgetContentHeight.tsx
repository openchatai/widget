import { useEffect, useRef } from 'react';

const SELECTOR = '[data-chat-widget-content-root]' as const;

export function useWidgetContentHeight() {
  /**
   * This is the element that we will observe for height changes
   */
  const observedElementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const contentRoot = document.querySelector<HTMLElement>(SELECTOR);

    if (contentRoot && observedElementRef.current) {
      const observedElement = observedElementRef.current;

      let animationFrame: number;
      const observer = new ResizeObserver(() => {
        animationFrame = requestAnimationFrame(() => {
          const height = observedElement.offsetHeight;
          contentRoot.style.setProperty(
            "--opencx-widget-height",
            height.toFixed(1) + 'px'
          );
        });
      });
      observer.observe(observedElement);

      return () => {
        cancelAnimationFrame(animationFrame);
        observer.unobserve(observedElement);
      };
    }
  }, []);

  return { observedElementRef };
}
