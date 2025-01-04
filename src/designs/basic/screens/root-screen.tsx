import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { useShouldCollectUserData } from 'src/hooks/useShouldCollectData';
import { WelcomeScreen } from './welcome-screen/WelcomeScreen';
import { MotionDiv } from '@ui/MotionDiv';
import { ChatScreen } from './chat-screen/ChatScreen';

export function RootScreen() {
  const { shouldCollectDataFirst } = useShouldCollectUserData();

  return (
    <div className="size-full bg-background">
      <AnimatePresence mode="wait">
        {shouldCollectDataFirst ? (
          <MotionDiv key="welcome-screen" fadeIn="right" className="size-full">
            <WelcomeScreen />
          </MotionDiv>
        ) : (
          <MotionDiv key="chat-screen" fadeIn="right" className="size-full">
            <ChatScreen />
          </MotionDiv>
        )}
      </AnimatePresence>
    </div>
  );
}
