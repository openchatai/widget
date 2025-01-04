import * as PopoverPrimitive from '@radix-ui/react-popover';
import Iframe from '@uiw/react-iframe';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { version } from '../package.json';
import { WidgetOptions } from '../react-lib/types';
import { Widget, WidgetRoot } from './designs/basic';
import { WidgetPopoverTrigger } from './designs/basic/WidgetPopoverTrigger';
import './index.css';
import styles from './index.css?inline';
import { render } from './render';


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

export function IframedWidgetPopover() {
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
          fontSize: '16px'
        }}
        sideOffset={8}
        data-chat-widget
        data-chat-widget-content-root
        align="end"
        asChild
      >
        <motion.div
          animate={isOpen ? 'visible' : 'hidden'}
          initial="hidden"
          variants={{
            hidden: {
              opacity: 0,
              y: 8,
              transitionEnd: { display: 'none' },
              transition: { duration: 0.15 }
            },
            visible: {
              opacity: 1,
              y: 0,
              display: 'block'
            }
          }}
        >
          <Iframe
            initialContent={initialContent}
            allowFullScreen
            data-chat-widget
            style={{
              maxHeight: '85dvh',
              minHeight: '400px',
              width: '350px',
              height: 'var(--opencx-widget-height)',
              overflow: 'hidden',
              /** outline is better than border because of box sizing; the outline wouldn't affect the content inside... the border will mess up how the children's border radius sits with the parent */
              outline: '1px solid',
              outlineColor: 'hsl(240 10% 3.9% / 0.2)',
              borderRadius: '32px',
              boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
              transitionProperty: 'height',
              transitionTimingFunction: 'ease-out',
              transitionDuration: '150ms'
            }}
          >
            <Widget data-chat-widget className="font-inter size-full" />
          </Iframe>
        </motion.div>
      </PopoverPrimitive.Content>
      <WidgetPopoverTrigger isOpen={isOpen} />
    </PopoverPrimitive.Root>
  );
}

const defaultRootId = 'opencopilot-root';

declare global {
  interface Window {
    initOpenScript: typeof initOpenScript;
    openCopilotWidgetVersion: string;
  }
}

function initOpenScript(options: WidgetOptions) {
  render(
    defaultRootId,
    <WidgetRoot options={options}>
      <IframedWidgetPopover />
    </WidgetRoot>
  );
}

window['initOpenScript'] = initOpenScript;
window['openCopilotWidgetVersion'] = version;
