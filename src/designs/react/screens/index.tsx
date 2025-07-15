import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { ChatScreen } from './chat';
import { WelcomeScreen } from './welcome';
import { usePreludeData, useWidgetRouter } from '../../../headless/react';
import { MotionDiv } from '../components/lib/MotionDiv';
import { SessionsScreen } from './sessions';
import { WidgetPortal } from '../components/lib/widget-portal';
import { isExhaustive } from '../../../headless/core';

export function RootScreen() {
  // Call the prelude ASAP so it's cached for all screens
  usePreludeData();

  const {
    routerState: { screen },
  } = useWidgetRouter();

  return (
    <div className="relative bg-background size-full">
      <WidgetPortal.Container />
      <AnimatePresence mode="wait">
        {(() => {
          switch (screen) {
            case 'welcome':
              return (
                <MotionDiv
                  key={screen}
                  fadeIn="right"
                  className="size-full"
                  snapExit
                >
                  <WelcomeScreen />
                </MotionDiv>
              );

            case 'sessions':
              return (
                <MotionDiv
                  key={screen}
                  fadeIn="right"
                  className="size-full"
                  snapExit
                >
                  <SessionsScreen />
                </MotionDiv>
              );

            case 'chat':
              return (
                <MotionDiv
                  key={screen}
                  fadeIn="right"
                  className="size-full"
                  snapExit
                >
                  <ChatScreen />
                </MotionDiv>
              );
            default: {
              isExhaustive(screen, RootScreen.name);
              return null;
            }
          }
        })()}
      </AnimatePresence>
    </div>
  );
}
