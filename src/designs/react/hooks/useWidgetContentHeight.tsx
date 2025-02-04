import { useEffect, useRef } from "react";

const SELECTOR = "[data-opencx-widget-content-root]" as const;

export function useWidgetContentHeight({
  fallbackHeight,
}: {
  /**
   * unrendered elements have an offset height of 0, this is causes a weird animation when opening the widget.
   * So, a fallback value equal to the fixed height or min height of the screen's root div solves the issue.
   */
  fallbackHeight: number;
}) {
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
          const height = Math.max(observedElement.offsetHeight, fallbackHeight);
          contentRoot.style.setProperty(
            "--opencx-widget-height",
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
  }, [fallbackHeight]);

  return { observedElementRef };
}
