import * as PopoverPrimitive from "@radix-ui/react-popover";
import Iframe from "@uiw/react-iframe";
import { MessageSquareDot, X, XIcon } from "lucide-react";
import { useState } from "react";
import styles from "../lib/index.css?inline";
import { Widget } from "./designs/basic";
import { cssVars } from "./designs/constants";
import { cn } from "./utils";

export function IframedWidgetPopover() {
  const [isOpen, setIsOpened] = useState(false);

  const handleClick = () => {
    setIsOpened(!isOpen);
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
