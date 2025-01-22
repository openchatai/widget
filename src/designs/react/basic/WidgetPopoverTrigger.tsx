import * as PopoverPrimitive from "@radix-ui/react-popover";
import { AnimatePresence } from "framer-motion";
import { XIcon } from "lucide-react";
import React from "react";
import { cssVars } from "../constants";
import { useConfig } from "../../../headless/react";
import { cn } from "../components/lib/utils/cn";
import { Wobble } from "../components/lib/wobble";
import { MotionDiv } from "../components/lib/MotionDiv";
import { OpenLogoSvg } from "../components/OpenLogoSvg";

function WidgetPopoverTrigger({ isOpen }: { isOpen: boolean }) {
  const { theme } = useConfig();

  return (
    <PopoverPrimitive.PopoverTrigger
      data-testid="widget-popover-trigger"
      data-chat-widget
      style={{
        fontSize: "16px",
        position: "fixed",
        zIndex: 10000000,
        ...cssVars(
          { primary: theme?.primaryColor },
          // { triggerOffset: theme.triggerOffset },
        ),
        // right: theme.triggerOffset,
        // bottom: theme.triggerOffset,
        right: "20px",
        bottom: "20px",
      }}
      className={"size-12 font-inter flex items-center justify-center"}
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
