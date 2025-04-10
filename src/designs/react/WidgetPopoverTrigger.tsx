import * as PopoverPrimitive from '@radix-ui/react-popover';
import { AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from 'lucide-react';
import React from 'react';
import { cn } from './components/lib/utils/cn';
import { Wobble, WOBBLE_MAX_MOVEMENT_PIXELS } from './components/lib/wobble';
import { MotionDiv } from './components/lib/MotionDiv';
import { ChatBubbleSvg } from './components/svg/ChatBubbleSvg';
import { OpenLogoPatternSvg } from './components/svg/OpenLogoPatternSvg';
import IFrame from '@uiw/react-iframe';
import styles from '../../../index.css?inline';
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

function WidgetPopoverTrigger({ isOpen }: { isOpen: boolean }) {
  const { theme, cssVars } = useTheme();

  return (
    <IFrame
      initialContent={initialContent}
      style={{
        height: `calc(${theme.widgetTrigger.size.button} + ${WOBBLE_MAX_MOVEMENT_PIXELS.x * 2}px)`,
        width: `calc(${theme.widgetTrigger.size.button} + ${WOBBLE_MAX_MOVEMENT_PIXELS.y * 2}px)`,
        fontSize: '16px',
        position: 'fixed',
        zIndex: 10000000,
        right: theme.widgetTrigger.offset.right,
        bottom: theme.widgetTrigger.offset.bottom,
      }}
    >
      <div
        data-opencx-widget
        style={{
          ...cssVars,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <PopoverPrimitive.PopoverTrigger
          className={cn('font-inter flex items-center justify-center')}
          style={{
            height: theme.widgetTrigger.size.button,
            width: theme.widgetTrigger.size.button,
          }}
        >
          <Wobble>
            <div
              className={cn(
                'relative size-full rounded-full',
                'flex items-center justify-center',
                'overflow-hidden',
                'transition-all',
                '[background:radial-gradient(50%_50%_at_50%_100%,hsl(var(--opencx-primary-foreground))_-75%,hsl(var(--opencx-primary))_100%)]',
                'text-primary-foreground',
                'active:scale-90',
              )}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <MotionDiv
                    key="x-icon"
                    snapExit
                    fadeIn="up"
                    overrides={{
                      initial: { rotate: 45 },
                      animate: { rotate: 0 },
                    }}
                  >
                    <ChevronDownIcon
                      style={{
                        width: theme.widgetTrigger.size.icon,
                        height: theme.widgetTrigger.size.icon,
                      }}
                    />
                  </MotionDiv>
                ) : (
                  <MotionDiv
                    key="message-icon"
                    snapExit
                    overrides={{
                      initial: { rotate: 45 },
                      animate: { rotate: 0 },
                    }}
                  >
                    <ChatBubbleSvg
                      style={{
                        width: theme.widgetTrigger.size.icon,
                        height: theme.widgetTrigger.size.icon,
                      }}
                      className="mt-0.5 opacity-95"
                    />
                  </MotionDiv>
                )}
              </AnimatePresence>
              <OpenLogoPatternSvg
                className="absolute inset-0 opacity-5"
                style={{
                  width: theme.widgetTrigger.size.button,
                  height: theme.widgetTrigger.size.button,
                }}
              />
            </div>
          </Wobble>
        </PopoverPrimitive.PopoverTrigger>
      </div>
    </IFrame>
  );
}

export { WidgetPopoverTrigger };
