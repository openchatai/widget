import { WidgetRoot } from "../lib/Root";
import { WidgetOptions } from "../lib/types";
import { render } from "./render";
import * as PopoverPrimitive from '@radix-ui/react-popover';
import Iframe from '@uiw/react-iframe';
import { useState } from 'react';
import styles from '../lib/index.css?inline';
import { Widget } from './designs/basic';
import { PopoverTrigger } from './designs/basic/PopoverTrigger';
import { AnimatePresence, motion } from 'framer-motion';

function IframedWidgetPopover() {
  const [isOpen, setIsOpened] = useState(false);

  return (
    <PopoverPrimitive.Root open={isOpen} onOpenChange={setIsOpened}>
      <style>{styles}</style>
      <AnimatePresence>
        {isOpen && (
          <PopoverPrimitive.Content
            onInteractOutside={(ev) => ev.preventDefault()}
            side="top"
            style={{
              maxHeight: '85dvh',
              width: '350px',
              height: '600px',
              fontSize: '16px',
              zIndex: 10000000,
              boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 40px',
              borderRadius: '24px'
            }}
            sideOffset={10}
            data-chat-widget
            align="end"
            asChild
          >
            <motion.div
              key="widget-container"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
            >

              <Iframe
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  overflow: 'hidden',
                }}
                data-chat-widget>
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
            </motion.div>

          </PopoverPrimitive.Content>
        )}
      </AnimatePresence>
      <PopoverTrigger isOpen={isOpen} />
    </PopoverPrimitive.Root>
  );
}

const defaultRootId = "opencopilot-root";

declare global {
  interface Window {
    initOpenScript: typeof initOpenScript;
  }
}

window["initOpenScript"] = initOpenScript;

export function initOpenScript(options: WidgetOptions) {
  render(
    defaultRootId,
    <WidgetRoot options={options}>
      <IframedWidgetPopover />
    </WidgetRoot>
  );
}