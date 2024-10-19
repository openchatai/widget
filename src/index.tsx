import { Root as PopoverRoot } from "@radix-ui/react-popover"
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { WidgetOptions } from "../lib/types";
import { AdvancedWidget } from "./themes/advanced";
import { WidgetPopoverTrigger } from "./themes/advanced/WidgetPopoverTrigger";
import { render } from "./render";
import styled, { ThemeProvider, StyleSheetManager } from "styled-components";
import { GlobalStyle, widgetTheme } from "./theme";
import { WidgetPopoverContent } from "./themes/advanced/WidgetPopoverContent";
import { TooltipProvider } from "@components/tooltip";
import { defaultRootId } from "./constants";

declare global {
  interface Window {
    initOpenScript: typeof initOpenScript;
  }
}

window["initOpenScript"] = initOpenScript;

const ColorCubes = styled.ul`
  display: flex;
  gap: 10px;
  margin: 0;
  flex-wrap: wrap;
  li {
    border-radius: 5px;
    padding: 10px;
    height: auto;
    aspect-ratio: 1/1;
    width: fit-content;
  }
`

function App({ options }: { options: WidgetOptions }) {
  const [isOpen, setIsOpened] = useState(true);

  return <ThemeProvider theme={widgetTheme}>
    <StyleSheetManager namespace={`#${defaultRootId}`}>
      <GlobalStyle />

      <ColorCubes>
        {Object.entries(widgetTheme.colors).map(([key, value]) => (
          <li key={key} style={{ backgroundColor: value }}>
            {key}
          </li>
        ))}
      </ColorCubes>

      <TooltipProvider delayDuration={100}>
        <PopoverRoot open={isOpen} onOpenChange={setIsOpened}>
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
          <WidgetPopoverTrigger />
        </PopoverRoot>
      </TooltipProvider>

    </StyleSheetManager>
  </ThemeProvider>
}

export function initOpenScript(options: WidgetOptions) {
  render(
    defaultRootId,
    <App options={options} />
  );
}