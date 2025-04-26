import * as PopoverPrimitive from '@radix-ui/react-popover';
import IFrame from '@uiw/react-iframe';
import { motion } from 'framer-motion';
import React from 'react';
import styles from '../../../index.css?inline';
import { useWidget, useWidgetTrigger } from '../../headless/react';
import { TooltipProvider } from './components/lib/tooltip';
import { cn } from './components/lib/utils/cn';
import { useTheme } from './hooks/useTheme';
import { RootScreen } from './screens';

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
<meta name="viewport" content="width=device-width, initial-scale=1, interactive-widget=resizes-content">
</head>
<body>
</body>
</html>`;

export function WidgetPopoverContent() {
  const { isOpen } = useWidgetTrigger();
  const chat = useWidget();
  const { theme, cssVars, computed } = useTheme();

  return (
    <PopoverPrimitive.Content
      onInteractOutside={(ev) => ev.preventDefault()}
      forceMount
      style={{
        zIndex: theme.widgetContentContainer.zIndex,
        fontSize: '16px',
        // @ts-expect-error this is a valid css variable
        '--opencx-widget-width': computed.minWidth,
        '--opencx-widget-height': computed.minHeight,
      }}
      side="top"
      align="end"
      sideOffset={theme.widgetContentContainer.offset.side}
      alignOffset={theme.widgetContentContainer.offset.align}
      avoidCollisions={false}
      data-opencx-widget
      data-opencx-widget-content-root
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
          title="OpenCX Live Chat"
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
            borderRadius: theme.widgetContentContainer.borderRadius,
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
  );
}
