import * as PopoverPrimitive from "@radix-ui/react-popover";
import { MessageSquareDot, X } from "lucide-react";
import React, { ComponentPropsWithoutRef, forwardRef } from "react";
import { ChatScreen } from "./screens/ChatScreen";
import { useChat } from "@lib/providers";
import { cn } from "@lib/utils/cn";
import { cssVars } from "../constants";

function WidgetPopover() {
  const [isOpen, setIsOpened] = React.useState(false);

  const handleClick = () => {
    setIsOpened(!isOpen);
  };

  return (
    <PopoverPrimitive.Root open={isOpen} onOpenChange={setIsOpened}>
      <PopoverPrimitive.Content
        onInteractOutside={(ev) => ev.preventDefault()}
        side="top"
        sideOffset={10}
        data-chat-widget
        asChild
        align="end"
        style={{ zIndex: 10000000 }}
      >
        <Widget className="max-h-[85dvh] w-[350px] h-[600px] font-inter shadow-lg" />
      </PopoverPrimitive.Content>

      <PopoverPrimitive.PopoverTrigger
        data-chat-widget
        className={`${cssVars} shadow-lg bottom-2 right-4 z-[200] fixed p-3 font-inter rounded-full text-white bg-dark transition-transform duration-300 ease-in-out transform active:scale-90`}
        onClick={handleClick}
      >
        <div
          className={cn(
            "size-6 transition-transform duration-300 ease-in-out",
            { "transform scale-110": isOpen },
          )}
        >
          {!isOpen ? (
            <MessageSquareDot className="size-6 transform -scale-95" />
          ) : (
            <X className="size-6" />
          )}
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