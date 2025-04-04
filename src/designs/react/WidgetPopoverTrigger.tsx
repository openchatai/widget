import * as PopoverPrimitive from '@radix-ui/react-popover';
import { AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from 'lucide-react';
import React from 'react';
import { cssVars } from './constants';
import { useConfig } from '../../headless/react';
import { cn } from './components/lib/utils/cn';
import { Wobble, WOBBLE_MAX_MOVEMENT_PIXELS } from './components/lib/wobble';
import { MotionDiv } from './components/lib/MotionDiv';
import { ChatBubbleSvg } from './components/svg/ChatBubbleSvg';
import { OpenLogoPatternSvg } from './components/svg/OpenLogoPatternSvg';
import IFrame from '@uiw/react-iframe';
import styles from '../../../index.css?inline';

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
  const { theme } = useConfig();

  return (
    <IFrame
      initialContent={initialContent}
      style={{
        height: `calc(48px + ${WOBBLE_MAX_MOVEMENT_PIXELS.x * 2}px)`,
        width: `calc(48px + ${WOBBLE_MAX_MOVEMENT_PIXELS.y * 2}px)`,
        fontSize: '16px',
        position: 'fixed',
        zIndex: 10000000,
        right: '20px',
        bottom: '20px',
      }}
    >
      <div
        data-opencx-widget
        style={{
          ...cssVars({ primary: theme?.primaryColor }),
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <PopoverPrimitive.PopoverTrigger
          className={cn(
            'size-[48px] font-inter flex items-center justify-center',
          )}
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
                    <ChevronDownIcon className="size-[24px]" />
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
                    <ChatBubbleSvg className="size-[24px] mt-0.5 opacity-95" />
                  </MotionDiv>
                )}
              </AnimatePresence>
              <OpenLogoPatternSvg className="absolute inset-0 opacity-5 size-[48px]" />
            </div>
          </Wobble>
        </PopoverPrimitive.PopoverTrigger>
      </div>
    </IFrame>
  );
}

export { WidgetPopoverTrigger };
