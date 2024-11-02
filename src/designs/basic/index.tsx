import * as PopoverPrimitive from "@radix-ui/react-popover";
import React, { ComponentPropsWithoutRef, forwardRef, useState } from "react";
import { ChatScreen } from "./screens/ChatScreen";
import { useChat, useConfigData, useSyncedState, useContact } from "@lib/index";
import { cssVars } from "../constants";
import { cn } from "src/utils";
import { AnimatePresence, motion } from "framer-motion";
import { PopoverTrigger } from "./PopoverTrigger";

function WidgetPopover() {
  const [isOpen, setIsOpened] = useSyncedState<boolean>("[widget-opened]", false, "session");
  const { contact } = useContact();
  const isWelcomeScreen = !contact?.id;

  return (
    <PopoverPrimitive.Root open={isOpen ?? false} onOpenChange={setIsOpened}>
      <AnimatePresence mode="wait">
        {isOpen && (
          <PopoverPrimitive.Content
            forceMount
            onInteractOutside={(ev) => ev.preventDefault()}
            side="top"
            sideOffset={10}
            data-chat-widget
            asChild
            align="end"
          >
            <motion.div
              style={{ transformOrigin: "bottom right", zIndex: 10000000 }}
              initial={{ opacity: 0, scale: 0.3, y: 20 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                y: 0,
              }}
              exit={{ 
                opacity: 0,
                scale: 0.3,
                y: 20,
                transition: {
                  duration: 0.2,
                  ease: "easeInOut"
                }
              }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 300,
              }}
              className={cn(
                "w-[350px]",
                isWelcomeScreen ? "h-[500px]" : "h-[600px]",
                "max-h-[85dvh]",
                "border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl"
              )}
            >
              <Widget className="overflow-hidden shadow-lg font-inter" />
            </motion.div>
          </PopoverPrimitive.Content>
        )}
      </AnimatePresence>
      <PopoverTrigger isOpen={isOpen ?? false} />
    </PopoverPrimitive.Root>
  );
}

const Widget = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<"div">
>(({ className, ...props }, _ref) => {
  const chat = useChat();
  const { theme } = useConfigData();

  return (
    <div style={{ display: "contents" }} data-chat-widget>
      <div
        {...props}
        ref={_ref}
        data-version={chat.version}
        data-chat-widget
        style={cssVars({ primary: theme.primaryColor }, { triggerOffset: theme.triggerOffset })}
        className={cn(
          "rounded-xl size-full overflow-hidden isolate relative text-secondary-foreground",
          className,
        )}
      >
        <div className="size-full absolute antialiased font-inter">
          <ChatScreen />
        </div>
      </div>
    </div>
  );
});

Widget.displayName = "Widget";

export {
  WidgetPopover,
  Widget,
}
