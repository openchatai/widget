import * as PopoverPrimitive from "@radix-ui/react-popover";
import React, { ComponentPropsWithoutRef, forwardRef } from "react";
import { ChatScreen } from "./screens/ChatScreen";
import { useChat, useConfigData } from "@lib/index";
import { cssVars } from "../constants";
import { cn } from "src/utils";
import { AnimatePresence, motion } from "framer-motion";
import { PopoverTrigger } from "./PopoverTrigger";

function WidgetPopover() {
  const [isOpen, setIsOpened] = React.useState(false);

  return (
    <PopoverPrimitive.Root open={isOpen} onOpenChange={setIsOpened}>
      <AnimatePresence>
        {
          isOpen && (<PopoverPrimitive.Content
            forceMount
            onInteractOutside={(ev) => ev.preventDefault()}
            side="top"
            sideOffset={10}
            data-chat-widget
            asChild
            align="end"
            style={{ zIndex: 10000000 }}
          >
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              style={{ transformOrigin: "bottom right" }}
              transition={{
                type: "spring",
                duration: 0.5,
              }}
              variants={{
                hidden: { opacity: 0, scale: 0.4 },
                visible: { opacity: 1, scale: 1 },
              }}
            >
              <Widget className="max-h-[85dvh] w-[350px] h-[600px] font-inter shadow-lg" />
            </motion.div>
          </PopoverPrimitive.Content>)
        }
      </AnimatePresence>
      <PopoverTrigger isOpen={isOpen} />
    </PopoverPrimitive.Root>
  );
}

const Widget = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<"div">
>(({ className, ...props }, _ref) => {
  const chat = useChat();
  const { theme } = useConfigData()

  return (
    <div style={{ display: "contents" }} data-chat-widget>
      <div
        {...props}
        ref={_ref}
        data-version={chat.version} data-chat-widget
        style={cssVars({ primary: theme.primaryColor }, { triggerOffset: theme.triggerOffset })}
        className={cn(
          "rounded-xl size-full overflow-hidden isolate relative font-inter",
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
