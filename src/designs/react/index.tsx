import React from "react";
import { cssVars, WIDGET_CONTENT_MIN_HEIGHT_PX, WIDGET_CONTENT_WIDTH_PX } from "./constants";
import { RootScreen } from "./screens";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import Iframe from "@uiw/react-iframe";
import { motion } from "framer-motion";
import { useState } from "react";
import styles from "../../../index.css?inline";
import { WidgetPopoverTrigger } from "./WidgetPopoverTrigger";
import { useConfig, useWidget, WidgetProvider } from "../../headless/react";
import { TooltipProvider } from "./components/lib/tooltip";
import { cn } from "./components/lib/utils/cn";
import type { WidgetConfig } from "../../headless/core";
import { BotLoadingComponent } from "./components/custom-components/Loading.component";
import { FallbackComponent } from "./components/custom-components/Fallback.component";
import { BotOrAgentResponse } from "./components/custom-components/BotOrAgentTextResponse.component";
import { useDocumentDir } from "../../headless/react/hooks/useDocumentDir";

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

function WidgetContent() {
  const chat = useWidget();
  const dir = useDocumentDir();
  const { theme } = useConfig();
  const [isOpen, setIsOpened] = useState(false);
  return (
    <PopoverPrimitive.Root open={isOpen} onOpenChange={setIsOpened}>
      {typeof styles === "string" && <style>{styles}</style>}
      <WidgetPopoverTrigger isOpen={isOpen} />
      <PopoverPrimitive.Content
        onInteractOutside={(ev) => ev.preventDefault()}
        side="top"
        data-aria-expanded={isOpen}
        forceMount
        style={{
          zIndex: 1000000,
          fontSize: "16px",
        }}
        sideOffset={8}
        data-chat-widget
        data-chat-widget-content-root
        align={dir === "rtl" ? "start" : "end"}
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
              width: WIDGET_CONTENT_WIDTH_PX,
              minHeight: WIDGET_CONTENT_MIN_HEIGHT_PX,
              height: "var(--opencx-widget-height)",
              overflow: "hidden",
              /** outline is better than border because of box sizing; the outline wouldn't affect the content inside... the border will mess up how the children's border radius sits with the parent */
              outline: "1px solid",
              outlineColor: "hsl(0 0% 50% / .5)",
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
                }}
                data-chat-widget
              >
                <div
                  style={{
                    ...cssVars(
                      { primary: theme?.primaryColor },
                      // { triggerOffset: theme.triggerOffset },
                    ),
                  }}
                  data-version={chat.version}
                  data-chat-widget
                  className={cn(
                    "antialiased font-inter bg-primary size-full overflow-hidden isolate relative text-secondary-foreground",
                  )}
                >
                  <RootScreen />
                </div>
              </div>
            </TooltipProvider>
          </Iframe>
        </motion.div>
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Root>
  );
}

function WidgetWrapper({ options }: { options: WidgetConfig }) {
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
          component: BotOrAgentResponse,
        },
        {
          key: "agent_message",
          component: BotOrAgentResponse,
        },
        // TODO allow accepting components from the outside to support UI components
      ]}
      options={options}
    >
      <WidgetContent />
    </WidgetProvider>
  );
}

export { WidgetWrapper as Widget };
