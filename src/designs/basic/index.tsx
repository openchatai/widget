import * as PopoverPrimitive from "@radix-ui/react-popover";
import { ComponentPropsWithoutRef, forwardRef } from "react";
import { ChatScreen } from "./screens/ChatScreen";
import { useChat, useConfigData, useSyncedState } from "@lib/index";
import { cssVars } from "../constants";
import { cn } from "src/utils";
import { AnimatePresence, motion } from "framer-motion";
import { TooltipProvider } from "@ui/tooltip";
import { PopoverTrigger } from "../_shared/PopoverTrigger";
import { useShouldCollectUserData } from "src/hooks/useShouldCollectData";
import { WelcomeScreen } from "../_shared/screens/WelcomeScreen";

function WidgetPopover() {
  const [isOpen, setIsOpened] = useSyncedState<boolean>("[widget-opened]", false, "session");

  return (
    <PopoverPrimitive.Root open={isOpen ?? false} onOpenChange={setIsOpened}>
      <AnimatePresence
        mode="wait"
      >
        {
          isOpen && (<PopoverPrimitive.Content
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
              className="max-h-[85dvh] w-[350px] h-fit shadow-xl rounded-xl overflow-hidden"
              variants={{
                hidden: {
                  rotate: "-10deg",
                  opacity: 0,
                },
                visible: {
                  rotate: 0,
                  opacity: 1,
                },
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 300,
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
            >
              <Widget className="overflow-hidden h-[600px] shadow-lg font-inter" />
            </motion.div>
          </PopoverPrimitive.Content>)
        }
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
  const { shouldCollectDataFirst } = useShouldCollectUserData();

  return (
    <TooltipProvider>
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
            {
              shouldCollectDataFirst ? (<WelcomeScreen />) : <ChatScreen headerStyle={theme.headerStyle} />
            }
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
});

Widget.displayName = "Widget";

export {
  WidgetPopover,
  Widget,
}
