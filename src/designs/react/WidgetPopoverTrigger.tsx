import * as PopoverPrimitive from "@radix-ui/react-popover";
import { AnimatePresence } from "framer-motion";
import { XIcon } from "lucide-react";
import React from "react";
import { cssVars } from "./constants";
import { useConfig } from "../../headless/react";
import { cn } from "./components/lib/utils/cn";
import { Wobble } from "./components/lib/wobble";
import { MotionDiv } from "./components/lib/MotionDiv";
import { ChatBubbleSvg } from "./components/svg/ChatBubbleSvg";
import { OpenLogoPatternSvg } from "./components/svg/OpenLogoPatternSvg";

function WidgetPopoverTrigger({ isOpen }: { isOpen: boolean }) {
  const { theme } = useConfig();

  return (
    <PopoverPrimitive.PopoverTrigger
      data-opencx-widget
      style={{
        fontSize: "16px",
        position: "fixed",
        zIndex: 10000000,
        ...cssVars({ primary: theme?.primaryColor }),
        right: "20px",
        bottom: "20px",
      }}
      className={cn("size-12 font-inter flex items-center justify-center")}
    >
      <Wobble>
        <div
          className={cn(
            "relative size-full rounded-full",
            "flex items-center justify-center",
            "overflow-hidden",
            "transition-all",
            // 'bg-gradient-to-t from-primary/50 via-primary to-primary',
            "[background:radial-gradient(50%_50%_at_50%_100%,hsl(var(--opencx-primary-foreground))_-75%,hsl(var(--opencx-primary))_100%)]",
            "text-primary-foreground",
            "shadow-xl",
            "active:scale-90",
            // "[&_svg]:size-6",
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
                <XIcon className="size-6" />
              </MotionDiv>
            ) : (
              <MotionDiv
                key="message-icon"
                snapExit
                overrides={{ initial: { rotate: 45 }, animate: { rotate: 0 } }}
              >
                <ChatBubbleSvg className="size-6 mt-0.5 opacity-95" />
              </MotionDiv>
            )}
          </AnimatePresence>
          <OpenLogoPatternSvg className="absolute inset-0 opacity-5 size-12" />
        </div>
      </Wobble>
    </PopoverPrimitive.PopoverTrigger>
  );
}

export { WidgetPopoverTrigger };
