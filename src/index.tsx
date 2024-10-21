import { Root as PopoverRoot } from "@radix-ui/react-popover"
import { AnimatePresence, motion } from "framer-motion";
import { ComponentRef, useRef, useState } from "react";
import { WidgetOptions } from "../lib/types";
import { AdvancedWidget } from "./themes/advanced";
import { WidgetPopoverTrigger } from "./themes/advanced/WidgetPopoverTrigger";
import { render } from "./render";
import { ThemeProvider, StyleSheetManager } from "styled-components";
import { GlobalStyle, widgetTheme } from "./theme";
import { WidgetPopoverContent } from "./themes/advanced/WidgetPopoverContent";
import { TooltipProvider } from "@components/tooltip";
import { defaultRootId } from "./constants";
import WidgetRoot from "@lib/providers/Root";

declare global {
  interface Window {
    initOpenScript: typeof initOpenScript;
  }
}

window["initOpenScript"] = initOpenScript;

function App({ options }: { options: WidgetOptions }) {
  const [isOpen, setIsOpened] = useState(true);
  const rootRef = useRef<ComponentRef<typeof WidgetRoot>>(null);

  return (
    <ThemeProvider theme={widgetTheme}>
      <StyleSheetManager namespace={`#${defaultRootId}`} enableVendorPrefixes>
        <GlobalStyle />
        <TooltipProvider delayDuration={100}>

          <PopoverRoot open={isOpen} onOpenChange={setIsOpened}>
            <WidgetRoot ref={rootRef} options={options}>
              <AnimatePresence>
                {isOpen && (
                  <WidgetPopoverContent
                    forceMount
                    onInteractOutside={(ev) => ev.preventDefault()}
                    align="end"
                    side="top"
                    sideOffset={10}
                    asChild
                  >
                    <motion.div
                      initial={{ opacity: 0, rotate: "-20deg", y: 20, scale: 0.9, pointerEvents: "none" }}
                      exit={{ opacity: 0, rotate: "-20deg", y: 20, scale: 0.9, pointerEvents: "none" }}
                      animate={{ opacity: 1, y: 0, rotate: "0deg", scale: 1, pointerEvents: "initial" }}
                    >
                      <AdvancedWidget />
                    </motion.div>
                  </WidgetPopoverContent>
                )}
              </AnimatePresence>
            </WidgetRoot>
            <WidgetPopoverTrigger />
          </PopoverRoot>

        </TooltipProvider>
      </StyleSheetManager>
    </ThemeProvider>
  )
}

export function initOpenScript(options: WidgetOptions) {
  render(
    defaultRootId,
    <App options={options} />
  );
}