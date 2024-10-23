import { cn } from "@lib/utils/cn";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import Iframe from "@uiw/react-iframe";
import { MessageSquareDot, X } from "lucide-react";
import { useState } from "react";
import styles from "../lib/index.css?inline";
import { Widget } from "./designs/basic";
import { cssVars } from "./designs/constants";

export function IframedWidgetPopover() {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <PopoverPrimitive.Root>
      <style>{styles}</style>
      <PopoverPrimitive.Content
        onInteractOutside={(ev) => ev.preventDefault()}
        side="top"
        sideOffset={10}
        style={{
          maxHeight: "85dvh",
          width: "350px",
          height: "600px",
          fontSize: "16px",
          zIndex: 10000000,
          textShadow: "rgba(0, 0, 0, 0.2) 0px 5px 40px",
          boxShadow: "rgba(0, 0, 0, 0.2) 0px 5px 40px",
        }}
        data-chat-widget
        align="end"
        asChild
      >
        <Iframe data-chat-widget className="rounded-xl">
          <style>
            {`
                        html, body {
                        height: 100%;
                        width: 100%;
                        margin: 0;
                        padding: 0;
                        font-size: 16px;
                            }
`}
          </style>
          <style>{styles}</style>
          <Widget data-chat-widget className="font-inter size-full" />
        </Iframe>
      </PopoverPrimitive.Content>

      <PopoverPrimitive.PopoverTrigger
        data-chat-widget
        className={cn(
          "bottom-2 right-4 z-[200] fixed p-3 font-inter rounded-full text-white bg-dark transition-transform duration-300 ease-in-out transform active:scale-90",
          cssVars
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
            <MessageSquareDot className="size-6 transform" />
          ) : (
            <X className="size-6" />
          )}
        </div>
      </PopoverPrimitive.PopoverTrigger>
    </PopoverPrimitive.Root>
  );
}
