import React, { type ComponentPropsWithoutRef, type ReactNode } from "react";
import { cssVars, DEFAULT_STYLES } from "../constants";
import { RootScreen } from "./screens/root-screen";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import Iframe from "@uiw/react-iframe";
import { motion } from "framer-motion";
import { useState } from "react";
import "../../../../index.css";
import styles from "../../../../index.css?inline";
import { WidgetPopoverTrigger } from "./WidgetPopoverTrigger";
import { useConfig, useWidget, WidgetProvider } from "../../../headless/react";
import { TooltipProvider } from "../components/lib/tooltip";
import { cn } from "../components/lib/utils/cn";
import type { WidgetConfig } from "../../../headless/core";
import { BotLoadingComponent } from "../components/Loading.component";
import { FallbackComponent } from "../components/Fallback.component";
import { BotOrAgentTextResponse } from "../components/Text.component";

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

function Widget({
  className,
  opened = false,
  ...props
}: ComponentPropsWithoutRef<"div"> & { opened?: boolean }) {
  const chat = useWidget();
  const { theme } = useConfig();
  const [isOpen, setIsOpened] = useState(opened);

  return (
    <PopoverPrimitive.Root open={isOpen} onOpenChange={setIsOpened}>
      <style>{styles}</style>
      <PopoverPrimitive.Content
        onInteractOutside={(ev) => ev.preventDefault()}
        side="top"
        data-aria-expanded={isOpen}
        data-testid="widget-popover-content"
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
            data-testid="widget-iframe"
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
                    { primary: theme?.primaryColor },
                    // { triggerOffset: theme.triggerOffset },
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
}: { options: WidgetConfig; children: ReactNode }) {
  return (
    <WidgetProvider
      components={[
        {
          key: "loading",
          component: BotLoadingComponent,
        },
        {
          key: "fallback",
          component: FallbackComponent,
        },
        {
          key: "bot_message",
          component: BotOrAgentTextResponse,
        },
        {
          key: "agent_message",
          component: BotOrAgentTextResponse,
        },
        // TODO allow accepting components from the outside to support UI components
      ]}
      options={options}
    >
      {children}
    </WidgetProvider>
  );
}

export { WidgetRoot, Widget };
