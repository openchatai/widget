import React from 'react';
import { RootScreen } from './screens';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import IFrame from '@uiw/react-iframe';
import { motion } from 'framer-motion';
import { useState } from 'react';
import styles from '../../../index.css?inline';
import { WidgetPopoverTrigger } from './WidgetPopoverTrigger';
import {
  useWidget,
  WidgetProvider,
  type WidgetComponentType,
} from '../../headless/react';
import { TooltipProvider } from './components/lib/tooltip';
import { cn } from './components/lib/utils/cn';
import type { ExternalStorage, WidgetConfig } from '../../headless/core';
import { BotLoadingComponent } from './components/custom-components/Loading.component';
import { FallbackComponent } from './components/custom-components/Fallback.component';
import { BotOrAgentResponse } from './components/custom-components/BotOrAgentTextResponse.component';
import { useDocumentDir } from '../../headless/react/hooks/useDocumentDir';
import { useTheme } from '../../headless/react/hooks/useTheme';

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
  const { theme, cssVars, computed } = useTheme();
  const [isOpen, setIsOpened] = useState(false);
  return (
    <PopoverPrimitive.Root open={isOpen} onOpenChange={setIsOpened}>
      {typeof styles === 'string' && <style>{styles}</style>}
      <WidgetPopoverTrigger isOpen={isOpen} />
      <PopoverPrimitive.Content
        onInteractOutside={(ev) => ev.preventDefault()}
        data-aria-expanded={isOpen}
        forceMount
        style={{
          zIndex: 1000000,
          fontSize: '16px',
          // @ts-expect-error this is a valid css variable
          '--opencx-widget-width': computed.minWidth,
          '--opencx-widget-height': computed.minHeight,
        }}
        side="top"
        sideOffset={theme.widgetContentContainer.offset}
        data-opencx-widget
        data-opencx-widget-content-root
        align={dir === 'rtl' ? 'start' : 'end'}
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
              transition: { duration: 0.15 },
            },
            visible: {
              opacity: 1,
              y: 0,
              display: 'block',
            },
          }}
        >
          <IFrame
            initialContent={initialContent}
            allowFullScreen
            data-opencx-widget
            style={{
              minWidth: computed.minWidth,
              width: 'var(--opencx-widget-width)',
              maxWidth: computed.maxWidth, // Relative to the viewport

              minHeight: computed.minHeight,
              height: 'var(--opencx-widget-height)',
              maxHeight: computed.maxHeight, // Relative to the viewport

              overflow: 'hidden',
              /** outline is better than border because of box sizing; the outline wouldn't affect the content inside... the border will mess up how the children's border radius sits with the parent */
              outline: '1px solid',
              outlineColor: 'hsl(0 0% 50% / .5)',
              borderRadius: '32px',
              boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
              transitionProperty: 'all',
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              transitionDuration: '800ms',
            }}
          >
            <TooltipProvider
              delayDuration={200}
              // this is important, because without it, the tooltip remains even after moving the mouse away from trigger
              disableHoverableContent
            >
              <div
                style={{
                  display: 'contents',
                }}
                data-opencx-widget
              >
                <div
                  style={{
                    ...cssVars,
                  }}
                  data-version={chat.version}
                  data-opencx-widget
                  className={cn(
                    'antialiased font-inter bg-primary size-full overflow-hidden isolate relative text-secondary-foreground',
                  )}
                >
                  <RootScreen />
                </div>
              </div>
            </TooltipProvider>
          </IFrame>
        </motion.div>
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Root>
  );
}

const defaultComponents: WidgetComponentType[] = [
  {
    key: 'loading',
    component: BotLoadingComponent,
  },
  {
    key: 'fallback',
    component: FallbackComponent,
  },
  {
    key: 'bot_message',
    component: BotOrAgentResponse,
  },
  {
    key: 'agent_message',
    component: BotOrAgentResponse,
  },
];

const storage: ExternalStorage = {
  get: async (key: string) => {
    return localStorage.getItem(key);
  },
  set: async (key: string, value: string) => {
    localStorage.setItem(key, value);
  },
  remove: async (key: string) => {
    localStorage.removeItem(key);
  },
};

function WidgetWrapper({
  options,
  components = [],
}: {
  options: WidgetConfig;
  components?: WidgetComponentType[];
}) {
  return (
    <WidgetProvider
      components={[...defaultComponents, ...components]}
      options={options}
      storage={storage}
    >
      <WidgetContent />
    </WidgetProvider>
  );
}

export { WidgetWrapper as Widget };
