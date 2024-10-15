import { WidgetRoot } from "@lib/index";
import { PopoverContent, Root as PopoverRoot } from "@radix-ui/react-popover"
import Iframe from "@uiw/react-iframe"
import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion";
import { useState } from "react";
import styles from "../lib/index.css?inline";
import { WidgetOptions } from "../lib/types";
import { AdvancedWidget } from "./designs/advanced";
import { WidgetPopoverTrigger } from "./designs/advanced/WidgetPopover";
import { render } from "./render";
const defaultRootId = "opencopilot-root";

declare global {
  interface Window {
    initOpenScript: typeof initOpenScript;
  }
}

window["initOpenScript"] = initOpenScript;

function App({ options }: { options: WidgetOptions }) {
  const [isOpen, setIsOpened] = useState(false);
  return <WidgetRoot options={options}>
    <LazyMotion features={domAnimation}>
      <PopoverRoot open={isOpen} onOpenChange={setIsOpened}>
        <AnimatePresence>
          {isOpen && (
            <PopoverContent
              forceMount
              asChild
              onInteractOutside={(ev) => ev.preventDefault()}
              align="end"
              side="top"
              alignOffset={0}
              updatePositionStrategy="optimized"
              sticky="always"
              sideOffset={10}
              className="z-max isolate origin-bottom-right max-w-[var(--radix-popover-content-available-width)-30px] max-h-[calc(var(--radix-popper-available-height)-30px)] w-[350px] h-[450px] min-h-0"
            >
              <m.div
                initial={{ opacity: 0, rotate: "-20deg", y: 20, scale: 0.9, pointerEvents: "none" }}
                exit={{ opacity: 0, rotate: "-20deg", y: 20, scale: 0.9, pointerEvents: "none" }}
                animate={{ opacity: 1, y: 0, rotate: "0deg", scale: 1, pointerEvents: "initial" }}
              >
                <Iframe
                  className="rounded-xl size-full overflow-hidden"
                  style={{
                    zIndex: 10000000,
                  }}>
                  <style>
                    {
                      `
                        html, body {
                        height: 100%;
                        width: 100%;
                        margin: 0;
                        padding: 0;
                        font-size: 16px;
                        }
                  `
                    }
                    {styles}
                  </style>
                  <AdvancedWidget className="shadow-none" />
                </Iframe>
              </m.div>
            </PopoverContent>
          )}
        </AnimatePresence>
        <WidgetPopoverTrigger />
      </PopoverRoot>
    </LazyMotion>
  </WidgetRoot>
}

export function initOpenScript(options: WidgetOptions) {
  render(
    defaultRootId,
    <App options={options} />
  );
}