import { isExhaustive } from '@opencx/widget-core';
import { useWidgetRouter } from '@opencx/widget-react-headless';
import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { MotionDiv } from '../components/lib/MotionDiv';
import { ChatScreen } from './chat';
import { SessionsScreen } from './sessions';
import { WelcomeScreen } from './welcome';

export function RootScreen() {
  const {
    routerState: { screen },
  } = useWidgetRouter();

  return (
    <div className="relative bg-background size-full">
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
