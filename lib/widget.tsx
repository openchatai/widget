import * as PopoverPrimitive from "@radix-ui/react-popover";
import { MessageSquareDot, X } from "lucide-react";
import React, { ComponentPropsWithoutRef, forwardRef, useEffect } from "react";
import { useChat } from "./providers";
import { ChatScreen } from "./screens/ChatScreen";
import { cn } from "./utils/cn";

export const cssVars = `
[--primary:211_65%_59%]
[--foreground:0_0%_0%]
[--background:0_0%_100%]
[--secondary:0_0%_96%]
[--primary-foreground:217_72%_18%]
[--accent:0_0_22%]
[--dark:0_0%_0%]
`;

export function WidgetPopover(props: { triggerId?: string }) {
  const [isClicked, setIsClicked] = React.useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };
  return (
    <PopoverPrimitive.Root>
      <PopoverPrimitive.Content
        onInteractOutside={(ev) => ev.preventDefault()}
        side="top"
        sideOffset={10}
        data-chat-widget
        className="shadow-lg"
        asChild
        align="end"
        style={{ zIndex: 10000000 }}
      >
        <Widget className="max-h-[85dvh] w-[350px] z-[200] h-[600px] font-inter" />
      </PopoverPrimitive.Content>

      <PopoverPrimitive.PopoverTrigger
        className={cn(
          "bottom-2 right-4 z-[200] fixed p-3 font-inter rounded-full text-white bg-dark transition-transform duration-300 ease-in-out transform active:scale-90",
          cssVars,
        )}
        onClick={handleClick}
      >
        <div
          className={cn(
            "size-6 transition-transform duration-300 ease-in-out",
            { "transform scale-110": isClicked },
          )}
        >
          {!isClicked ? (
            <MessageSquareDot className="size-6 transform scale-y-[-1]" />
          ) : (
            <X className="size-6" />
          )}
        </div>
      </PopoverPrimitive.PopoverTrigger>
    </PopoverPrimitive.Root>
  );
}

export const Widget = forwardRef<
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
