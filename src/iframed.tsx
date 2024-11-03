import * as PopoverPrimitive from '@radix-ui/react-popover';
import Iframe from '@uiw/react-iframe';
import { useState } from 'react';
import styles from '../lib/index.css?inline';
import { Widget } from './designs/basic';
import { PopoverTrigger } from './designs/basic/PopoverTrigger';
import { AnimatePresence, motion } from 'framer-motion';

export function IframedWidgetPopover() {
  const [isOpen, setIsOpened] = useState(false);

  return (
    <PopoverPrimitive.Root open={isOpen} onOpenChange={setIsOpened}>
      <style>{styles}</style>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="widget-container"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            // exit is not working
            exit={{ opacity: 0, y: 16 }}
          >
            <PopoverPrimitive.Content
              onInteractOutside={(ev) => ev.preventDefault()}
              side="top"
              // sideOffset={16}
              style={{
                maxHeight: '85dvh',
                width: '350px',
                height: '600px',
                fontSize: '16px',
                zIndex: 10000000,
                // textShadow: "rgba(0, 0, 0, 0.2) 0px 5px 40px",
                boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 40px',
                // border: "1px solid rgb(228, 228, 231)",
                borderRadius: '24px'
              }}
              data-chat-widget
              align="end"
              asChild
            >
              <Iframe data-chat-widget>
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
          </motion.div>
        )}
      </AnimatePresence>

      <PopoverTrigger isOpen={isOpen} />
    </PopoverPrimitive.Root>
  );
}
