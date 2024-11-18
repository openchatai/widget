import * as PopoverPrimitive from "@radix-ui/react-popover";
import { ComponentPropsWithoutRef, forwardRef } from "react";
import { ChatScreen } from "./screens/ChatScreen";
import { useChat, useConfigData, useSyncedState } from "@lib/index";
import { cssVars } from "../constants";
import { cn } from "src/utils";
import { AnimatePresence, motion } from "framer-motion";
import { PopoverTrigger } from "./PopoverTrigger";
import { TooltipProvider } from "@ui/tooltip";
import { Toaster } from 'react-hot-toast';
import { InfoIcon, BadgeInfo, CheckCircle2Icon } from "lucide-react";

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
              className="max-h-[85dvh] w-[350px] h-fit shadow-lg rounded-2xl border"
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

function WidgetToaster() {
  return <Toaster
    position="top-center"
    containerStyle={{
      position: "absolute",
      top: "0",
      maxHeight: "50%",
      overflow: "hidden",
    }}
    toastOptions={{
      position: 'top-center',
      blank: {
        className: 'text-primary-foreground bg-background text-xs max-w-[200px] p-2 font-medium rounded-lg border flex items-center gap-1 w-full',
        icon: <BadgeInfo className="size-5 shrink-0 text-primary-foreground" />,
      },
      success: {
        icon: <CheckCircle2Icon className="size-5 shrink-0 text-emerald-600" />,
        className: 'text-emerald-700 bg-background text-xs p-2 max-w-[200px] font-medium rounded-lg border flex items-center gap-1 w-full',
      },
      error: {
        icon: <InfoIcon className="size-5 shrink-0 text-rose-600" />,
        className: 'text-red-700 bg-background text-xs max-w-[200px] p-2 font-medium rounded-lg border flex items-center gap-1 w-full',
      },
    }}
  />
}

const Widget = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<"div">
>(({ className, ...props }, _ref) => {
  const chat = useChat();
  const { theme } = useConfigData();

  return (
    <TooltipProvider>
      <div style={{ display: "contents", ...cssVars({ primary: theme.primaryColor }, { triggerOffset: theme.triggerOffset }) }} data-chat-widget>
        <div
          {...props}
          ref={_ref}
          data-version={chat.version}
          data-chat-widget
          className={cn(
            "rounded-xl size-full overflow-hidden isolate relative text-secondary-foreground",
            className,
          )}
        >
          <div className="size-full absolute antialiased font-inter">
            <ChatScreen />
          </div>
        </div>

        <WidgetToaster />
      </div>
    </TooltipProvider>
  );
});

Widget.displayName = "Widget";

export {
  WidgetPopover,
  Widget,
}
