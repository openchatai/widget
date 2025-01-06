import React from "react";
import { motion, Target } from "framer-motion";
import { ComponentProps, forwardRef } from "react";

type MotionProps = ComponentProps<typeof motion.div>;
type AnimationDirection = "right" | "left" | "up" | "down";
type MotionDivProps = MotionProps & {
  fadeIn?: AnimationDirection;
  distance?: number;
  snapExit?: boolean;
  overrides?: Overrides;
};

type Overrides = {
  initial?: Target;
  animate?: Target;
  exit?: Target;
};

export const ANIMATION_DISTANCE_PX = 10;

const fadeInRight = (distance: number, overrides: Overrides): MotionProps => ({
  initial: { opacity: 0, x: -distance, ...overrides.initial },
  animate: { opacity: 1, x: 0, ...overrides.animate },
  exit: { opacity: 0, x: distance, ...overrides.exit },
});

const fadeInLeft = (distance: number, overrides: Overrides): MotionProps => ({
  initial: { opacity: 0, x: distance, ...overrides.initial },
  animate: { opacity: 1, x: 0, ...overrides.animate },
  exit: { opacity: 0, x: -distance, ...overrides.exit },
});

const fadeInUp = (distance: number, overrides: Overrides): MotionProps => ({
  initial: { opacity: 0, y: distance, ...overrides.initial },
  animate: { opacity: 1, y: 0, ...overrides.animate },
  exit: { opacity: 0, y: -distance, ...overrides.exit },
});

const fadeInDown = (distance: number, overrides: Overrides): MotionProps => ({
  initial: { opacity: 0, y: -distance, ...overrides.initial },
  animate: { opacity: 1, y: 0, ...overrides.animate },
  exit: { opacity: 0, y: distance, ...overrides.exit },
});

const treasureMap: Record<
  AnimationDirection,
  (distance: number, overrides: Overrides) => MotionProps
> = {
  right: fadeInRight,
  left: fadeInLeft,
  up: fadeInUp,
  down: fadeInDown,
};

const MotionDiv = forwardRef<HTMLDivElement, MotionDivProps>(
  (
    {
      fadeIn = "down",
      distance = ANIMATION_DISTANCE_PX,
      children,
      snapExit = false,
      overrides = {},
      ...props
    },
    ref,
  ) => {
    const fadeInProps: MotionProps = fadeIn
      ? treasureMap[fadeIn](distance, overrides)
      : {};

    if (
      snapExit &&
      fadeInProps.exit &&
      typeof fadeInProps.exit === "object" &&
      !Array.isArray(fadeInProps.exit)
    ) {
      fadeInProps.exit.transition = { duration: 0 };
    }

    return (
      <motion.div ref={ref} {...props} {...fadeInProps}>
        {children}
      </motion.div>
    );
  },
);
MotionDiv.displayName = "MotionDiv";

export { MotionDiv };