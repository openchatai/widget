import React, {
  cloneElement,
  forwardRef,
  type ReactElement,
  useState,
} from 'react';
import { memo } from 'react';
import { cn } from './utils/cn';

/**
 * The maximum number of pixels the element can move in the x and y directions
 *
 * This would make very small elements wobble more visibly, and large elements would wobble more subtly
 */
export const WOBBLE_MAX_MOVEMENT_PIXELS = {
  x: 2,
  y: 2,
};

const INVERSE_SCALE = true;

type ChildProps = {
  onMouseMove?: (event: React.MouseEvent<HTMLElement>) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  style?: React.CSSProperties;
  className?: string;
  ref: React.ForwardedRef<HTMLElement>;
};

export interface WobbleProps {
  children: ReactElement<ChildProps>;
  className?: string;
  scale?: number;
  off?: boolean;
}

const Wobble = memo(
  forwardRef<HTMLElement, WobbleProps>(
    ({ children, className, scale = 1.02, off = false }, ref) => {
      const [isHovering, setIsHovering] = useState(false);
      const [movement, setMovement] = useState({ x: 0, y: 0 });

      if (off) return children;

      const hasTranslateClass = /translate/.test(
        children.props.className || '',
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
        '--wobble-x': isHovering ? `${movement.x}px` : '0px',
        '--wobble-y': isHovering ? `${movement.y}px` : '0px',
        '--scale': INVERSE_SCALE
          ? 1 - (scale - 1) // if scale is 1.02, it becomes 0.98
          : scale,
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
          'translate-x-[var(--wobble-x)]',
          'translate-y-[var(--wobble-y)]',
          'hover:scale-[var(--scale)] active:hover:scale-[calc(var(--scale)-0.02)]',
          className,
          children.props.className,
          'transition-all ease-out',
        ),
      });
    },
  ),
);

Wobble.displayName = 'Wobble';

export { Wobble };
