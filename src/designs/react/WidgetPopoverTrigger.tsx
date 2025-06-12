import * as PopoverPrimitive from '@radix-ui/react-popover';
import IFrame from '@uiw/react-iframe';
import { AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from 'lucide-react';
import React from 'react';
import styles from '../../../index.css?inline';
import { useWidget, useWidgetTrigger } from '../../headless/react';
import { MotionDiv } from './components/lib/MotionDiv';
import { cn } from './components/lib/utils/cn';
import { Wobble, WOBBLE_MAX_MOVEMENT_PIXELS } from './components/lib/wobble';
import { ChatBubbleSvg } from './components/svg/ChatBubbleSvg';
import { useTheme } from './hooks/useTheme';
import { OpenCxComponentName } from '../../headless/core';

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

function WidgetPopoverTrigger() {
  const { isOpen } = useWidgetTrigger();
  const { cssOverrides } = useWidget();
  const { theme, cssVars } = useTheme();

  return (
    <IFrame
      initialContent={initialContent}
      style={{
        height: `calc(${theme.widgetTrigger.size.button}px + ${WOBBLE_MAX_MOVEMENT_PIXELS.x * 2}px)`,
        width: `calc(${theme.widgetTrigger.size.button}px + ${WOBBLE_MAX_MOVEMENT_PIXELS.y * 2}px)`,
        fontSize: '16px',
        position: 'fixed',
        zIndex: theme.widgetTrigger.zIndex,
        right: theme.widgetTrigger.offset.right,
        bottom: theme.widgetTrigger.offset.bottom,

        // reset iframe defaults
        boxSizing: 'border-box',
        borderWidth: '0px',
      }}
    >
      {cssOverrides && <style>{cssOverrides}</style>}
      <div
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
          className={cn(
            'font-inter flex items-center justify-center rounded-full',
          )}
          style={{
            height: theme.widgetTrigger.size.button,
            width: theme.widgetTrigger.size.button,
          }}
        >
          <Wobble>
            <div
              data-component={OpenCxComponentName['trigger__button']}
              className={cn(
                'relative size-full rounded-full',
                'flex items-center justify-center',
                'overflow-hidden',
                'transition-all',
                'bg-primary',
                'text-primary-foreground',
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
            </div>
          </Wobble>
        </PopoverPrimitive.PopoverTrigger>
      </div>
    </IFrame>
  );
}

export { WidgetPopoverTrigger };
