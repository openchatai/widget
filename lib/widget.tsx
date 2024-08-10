import React, { ComponentPropsWithoutRef, forwardRef, useState } from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { MessageSquareDot, X } from "lucide-react";
import { ConfigDataProvider } from "./providers/ConfigDataProvider";
import { ChatProvider } from "./providers/ChatProvider";
import { ChatScreen } from "./screens/ChatScreen";
import { cn } from "./utils/cn";
import { WidgetOptions } from "./types";

const vars = `
[--primary:211_65%_59%]
[--foreground:0_0%_0%]
[--background:0_0%_100%]
[--secondary:0_0%_96%]
[--primary-foreground:217_72%_18%]
[--accent:0_0_22%]
[--dark:0_0%_0%]
`;

export function WidgetPopover() {
  const [isClicked, setIsClicked] = useState(false);
  const handleClick = () => {
    setIsClicked(!isClicked);
  };
  return (
    <PopoverPrimitive.Root>
      <div style={{ display: "content" }} data-chat-widget>
        <PopoverPrimitive.Content
          onInteractOutside={(ev) => ev.preventDefault()}
          side="top"
          sideOffset={10}
          data-chat-widget
          align="end"
        >
          <Widget className="max-h-[85dvh] w-[350px] z-[200] h-[600px]" />
        </PopoverPrimitive.Content>
      </div>
      <div style={{ display: "content" }} data-chat-widget>
        <PopoverPrimitive.PopoverTrigger
          className={cn(
            "bottom-2 right-4 z-[200] absolute p-3 rounded-full text-white bg-dark transition-transform duration-300 ease-in-out transform active:scale-90",
            vars
          )}
          onClick={handleClick}
        >
          <div
            className={cn(
              "size-6 transition-transform duration-300 ease-in-out",
              { "transform scale-110": isClicked }
            )}
          >
            {!isClicked ? (
              <MessageSquareDot className="size-6 transform scale-y-[-1]" />
            ) : (
              <X className="size-6" />
            )}
          </div>
        </PopoverPrimitive.PopoverTrigger>
      </div>
    </PopoverPrimitive.Root>
  );
}

export const Widget = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<"div">
>(({ className, ...props }, _ref) => {
  return (
    <div style={{ display: "contents" }} data-chat-widget>
      <div
        {...props}
        ref={_ref}
        className={cn(
          "rounded-xl size-full overflow-hidden isolate relative",
          vars,
          className
        )}
      >
        <div className="size-full absolute antialiased">
          <ChatScreen />
        </div>
      </div>
    </div>
  );
});

Widget.displayName = "Widget";

export function WidgetRoot({
  children,
  options,
}: {
  children: React.ReactNode;
  options: WidgetOptions;
}) {
  return (
    <ConfigDataProvider data={options}>
      <ChatProvider>{children}</ChatProvider>
    </ConfigDataProvider>
  );
}
