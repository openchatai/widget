import * as PopoverPrimitive from "@radix-ui/react-popover";
import { useConfig } from "@react/core-integration";
import { Wobble } from "@ui/wobble";
import { AnimatePresence } from "framer-motion";
import { XIcon } from "lucide-react";
import React from "react";
import { cn } from "src/utils";
import { cssVars } from "../constants";
import { OpenLogoSvg } from "src/@components/OpenLogoSvg";
import { MotionDiv } from "@ui/MotionDiv";

function WidgetPopoverTrigger({ isOpen }: { isOpen: boolean }) {
  const {
    config: { theme },
  } = useConfig();

  return (
    <PopoverPrimitive.PopoverTrigger
      data-testid="widget-popover-trigger"
      data-chat-widget
      style={{
        fontSize: "16px",
        position: "fixed",
        zIndex: 10000000,
        ...cssVars(
          { primary: theme.primaryColor },
          { triggerOffset: theme.triggerOffset },
        ),
        right: theme.triggerOffset,
        bottom: theme.triggerOffset,
      }}
      className={cn("size-12 font-inter flex items-center justify-center")}
    >
      <Wobble>
        <div
          className={cn(
            "relative size-full rounded-full",
            "flex items-center justify-center",
            "transition-all",
            // 'bg-gradient-to-t from-primary/50 via-primary to-primary',
            "[background:radial-gradient(68.75%_68.75%_at_50%_100%,_#717171_0%,_#000000_100%)]",
            "text-primary-foreground",
            "shadow-xl",
            "active:scale-90",
            "[&_svg]:size-6",
          )}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <MotionDiv
                key="x-icon"
                snapExit
                fadeIn="up"
                overrides={{ initial: { rotate: 45 }, animate: { rotate: 0 } }}
              >
                <XIcon />
              </MotionDiv>
            ) : (
              <MotionDiv
                key="message-icon"
                snapExit
                overrides={{ initial: { rotate: 45 }, animate: { rotate: 0 } }}
              >
                <OpenLogoSvg />
              </MotionDiv>
            )}
          </AnimatePresence>
        </div>
      </Wobble>
    </PopoverPrimitive.PopoverTrigger>
  );
}

export { WidgetPopoverTrigger };
