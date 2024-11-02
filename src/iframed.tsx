import * as PopoverPrimitive from "@radix-ui/react-popover";
import Iframe from "@uiw/react-iframe";
import { useState } from "react";
import styles from "../lib/index.css?inline";
import { Widget } from "./designs/basic";
import { PopoverTrigger } from "./designs/basic/PopoverTrigger";

export function IframedWidgetPopover() {
  const [isOpen, setIsOpened] = useState(false);

  return (
    <PopoverPrimitive.Root open={isOpen} onOpenChange={setIsOpened}>
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
      <PopoverTrigger isOpen={isOpen} />
    </PopoverPrimitive.Root>
  );
}
