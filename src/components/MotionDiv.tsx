import { motion } from 'framer-motion';
import { ComponentProps, forwardRef } from 'react';

type MotionProps = ComponentProps<typeof motion.div>;
type AnimationDirection = 'right' | 'left' | 'up' | 'down';
type MotionDivProps = MotionProps & {
  fadeIn?: AnimationDirection;
  distance?: number;
  snapExit?: boolean;
};

export const ANIMATION_DISTANCE_PX = 10;

const fadeInRight = (distance: number): MotionProps => ({
  initial: { opacity: 0, x: -distance },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: distance }
});

const fadeInLeft = (distance: number): MotionProps => ({
  initial: { opacity: 0, x: distance },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -distance }
});

const fadeInUp = (distance: number): MotionProps => ({
  initial: { opacity: 0, y: distance },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -distance }
});

const fadeInDown = (distance: number): MotionProps => ({
  initial: { opacity: 0, y: -distance },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: distance }
});

const treasureMap: Record<
  AnimationDirection,
  (distance: number) => MotionProps
> = {
  right: fadeInRight,
  left: fadeInLeft,
  up: fadeInUp,
  down: fadeInDown
};

const MotionDiv = forwardRef<HTMLDivElement, MotionDivProps>(
  (
    {
      fadeIn = 'down',
      distance = ANIMATION_DISTANCE_PX,
      children,
      snapExit = false,
      ...props
    },
    ref
  ) => {
    const fadeInProps: MotionProps = fadeIn
      ? treasureMap[fadeIn](distance)
      : {};

    if (
      snapExit &&
      fadeInProps.exit &&
      typeof fadeInProps.exit === 'object' &&
      !Array.isArray(fadeInProps.exit)
    ) {
      fadeInProps.exit.transition = { duration: 0 };
    }

    return (
      <motion.div ref={ref} {...props} {...fadeInProps}>
        {children}
      </motion.div>
    );
  }
);
MotionDiv.displayName = 'MotionDiv';

export { MotionDiv };
