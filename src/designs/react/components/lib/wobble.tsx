import React, {
  cloneElement,
  forwardRef,
  type ReactElement,
  useState,
} from "react";
import { memo } from "react";
import { cn } from "./utils/cn";
/**
 * The maximum number of pixels the element can move in the x and y directions
 *
 * This would make very small elements wobble more visibly, and large elements would wobble more subtly
 */
export const WOBBLE_MAX_MOVEMENT_PIXELS = {
  x: 2,
  y: 2,
};

const scaleVariants = {
  "1": "scale-[1]",
  "1.01": "scale-[1.01]",
  "1.02": "scale-[1.02]",
  "1.1": "scale-[1.1]",
};

export interface WobbleProps {
  children: ReactElement;
  className?: string;
  scale?: keyof typeof scaleVariants;
  off?: boolean;
}

const Wobble = memo(
  forwardRef<HTMLElement, WobbleProps>(
    ({ children, className, scale = "1.02", off = false }, ref) => {
      const [isHovering, setIsHovering] = useState(false);
      const [movement, setMovement] = useState({ x: 0, y: 0 });

      if (off) return children;

      const hasTranslateClass = /translate/.test(
        children.props.className || "",
      );
      if (hasTranslateClass) return children;

      /**
       * Thanks Mr. ChatGippity for refactoring this function
       */
      const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
        const { clientX, clientY } = event;
        const rect = event.currentTarget.getBoundingClientRect();

        // Calculate mouse position relative to the center of the element
        const offsetX = clientX - (rect.left + rect.width / 2);
        const offsetY = clientY - (rect.top + rect.height / 2);

        // Normalize offset values to the range [-1, 1]
        const normalizedX = Math.max(
          -1,
          Math.min(1, offsetX / (rect.width / 2)),
        );
        const normalizedY = Math.max(
          -1,
          Math.min(1, offsetY / (rect.height / 2)),
        );

        // Scale normalized values to the desired range
        const x = normalizedX * WOBBLE_MAX_MOVEMENT_PIXELS.x;
        const y = normalizedY * WOBBLE_MAX_MOVEMENT_PIXELS.y;

        setMovement({ x, y });
        children.props.onMouseMove?.(event);
      };

      const handleMouseEnter = () => {
        setIsHovering(true);
        children.props.onMouseEnter?.();
      };
      const handleMouseLeave = () => {
        setIsHovering(false);
        setMovement({ x: 0, y: 0 });
        children.props.onMouseLeave?.();
      };

      const childStyles = {
        "--opencx-wobble-x": isHovering ? `${movement.x}px` : "0px",
        "--opencx-wobble-y": isHovering ? `${movement.y}px` : "0px",
      } as React.CSSProperties;

      return cloneElement(children, {
        ref,
        onMouseMove: handleMouseMove,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        style: {
          ...childStyles,
          ...children.props.style,
        },
        className: cn(
          "translate-x-[var(--opencx-wobble-x)]",
          "translate-y-[var(--opencx-wobble-y)]",
          `hover:${scaleVariants[scale]}`,
          className,
          children.props.className,
          "transition-all ease-out",
        ),
      });
    },
  ),
);

Wobble.displayName = "Wobble";

export { Wobble };
