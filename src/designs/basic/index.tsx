import * as PopoverPrimitive from "@radix-ui/react-popover";
import { MessageSquareDot, XIcon } from "lucide-react";
import React, { ComponentPropsWithoutRef, forwardRef } from "react";
import { ChatScreen } from "./screens/ChatScreen";
import { useChat } from "@lib/index";
import { cssVars } from "../constants";
import { cn } from "src/utils";
import { AnimatePresence, motion } from "framer-motion";

function WidgetPopover() {
  const [isOpen, setIsOpened] = React.useState(false);

  const handleClick = () => {
    setIsOpened(!isOpen);
  };

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

      <PopoverPrimitive.PopoverTrigger
        data-chat-widget
        className={`${cssVars} shadow-lg hover:brightness-105 size-fit bottom-2 right-4 transition-all z-[200] fixed font-inter rounded-full text-white bg-primary duration-300 ease-in-out transform active:scale-90`}
        onClick={handleClick}
      >
        <div
          className={cn(
            "p-3 transition-transform duration-300 relative ease-in-out",
            { "transform scale-110": isOpen },
          )}
        >
          {!isOpen ? (
            <MessageSquareDot className="size-6" />
          ) : (
            <XIcon className="size-6" />
          )}
          <span className="absolute top-0 right-0 size-3 bg-emerald-600 border-2 border-white rounded-full" />
        </div>
      </PopoverPrimitive.PopoverTrigger>
    </PopoverPrimitive.Root>
  );
}

const Widget = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<"div">
>(({ className, ...props }, _ref) => {
  const chat = useChat()
  return (
    <div style={{ display: "contents" }} data-chat-widget>
      <div
        {...props}
        ref={_ref}
        data-version={chat.version} data-chat-widget
        className={cn(
          "rounded-xl size-full overflow-hidden isolate relative font-inter",
          cssVars,
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
