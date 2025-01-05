import {
  useChat,
  useConfigData,
  WidgetOptions,
  WidgetRoot as OriginalWidgetRoot,
} from "@react/index";
import { TooltipProvider } from "@ui/tooltip";
import React, { ComponentPropsWithoutRef, ReactNode } from "react";
import {
  BotLoadingComponent,
  BotTextResponse,
  FallbackComponent,
} from "src/@components";
import { cn } from "src/utils";
import { cssVars, DEFAULT_STYLES } from "../constants";
import { RootScreen } from "./screens/root-screen";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import Iframe from "@uiw/react-iframe";
import { motion } from "framer-motion";
import { useState } from "react";
import "../../index.css";
import styles from "../../index.css?inline";
import { WidgetPopoverTrigger } from "./WidgetPopoverTrigger";

const initialContent = `<!DOCTYPE html>
<html>
<head>
<style>
${styles}
html, body {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    font-size: 16px;
}
</style>
</head>
<body>
</body>
</html>`;

function Widget({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  const chat = useChat();
  const { theme } = useConfigData();
  const [isOpen, setIsOpened] = useState(false);

  return (
    <PopoverPrimitive.Root open={isOpen} onOpenChange={setIsOpened}>
      <style>{styles}</style>
      <PopoverPrimitive.Content
        onInteractOutside={(ev) => ev.preventDefault()}
        side="top"
        forceMount
        style={{
          zIndex: 1000000,
          fontSize: "16px",
        }}
        sideOffset={8}
        data-chat-widget
        data-chat-widget-content-root
        align="end"
        asChild
      >
        <motion.div
          animate={isOpen ? "visible" : "hidden"}
          initial="hidden"
          variants={{
            hidden: {
              opacity: 0,
              y: 8,
              transitionEnd: { display: "none" },
              transition: { duration: 0.15 },
            },
            visible: {
              opacity: 1,
              y: 0,
              display: "block",
            },
          }}
        >
          <Iframe
            initialContent={initialContent}
            allowFullScreen
            data-chat-widget
            style={{
              maxHeight: "85dvh",
              width: "350px",
              minHeight: DEFAULT_STYLES.widgetMinHeight,
              height: "var(--opencx-widget-height)",
              overflow: "hidden",
              /** outline is better than border because of box sizing; the outline wouldn't affect the content inside... the border will mess up how the children's border radius sits with the parent */
              outline: "1px solid",
              outlineColor: "hsl(240 10% 3.9% / 0.2)",
              borderRadius: "32px",
              boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.25)",
              transitionProperty: "height",
              transitionTimingFunction: "ease-out",
              transitionDuration: "150ms",
            }}
          >
            <TooltipProvider
              delayDuration={200}
              // this is important, because without it, the tooltip remains even after moving the mouse away from trigger
              disableHoverableContent
            >
              <div
                style={{
                  display: "contents",
                  ...cssVars(
                    { primary: theme.primaryColor },
                    { triggerOffset: theme.triggerOffset },
                  ),
                }}
                data-chat-widget
              >
                <div
                  {...props}
                  data-version={chat.version}
                  data-chat-widget
                  className={cn(
                    "antialiased font-inter size-full overflow-hidden isolate relative text-secondary-foreground",
                    className,
                  )}
                >
                  <RootScreen />
                </div>
              </div>
            </TooltipProvider>
          </Iframe>
        </motion.div>
      </PopoverPrimitive.Content>
      <WidgetPopoverTrigger isOpen={isOpen} />
    </PopoverPrimitive.Root>
  );
}

function WidgetRoot({
  options,
  children,
}: { options: WidgetOptions; children: ReactNode }) {
  return (
    <OriginalWidgetRoot
      options={{
        ...options,
        components: [
          {
            key: "LOADING",
            component: BotLoadingComponent,
          },
          {
            key: "FALLBACK",
            component: FallbackComponent,
          },
          {
            key: "TEXT",
            component: BotTextResponse,
          },
        ],
      }}
    >
      {children}
    </OriginalWidgetRoot>
  );
}

export { WidgetRoot, Widget };
