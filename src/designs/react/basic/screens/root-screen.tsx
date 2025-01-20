import { MotionDiv } from "src/designs/react/components/lib/MotionDiv";
import { AnimatePresence } from "framer-motion";
import React from "react";
import { ChatScreen } from "./chat-screen/ChatScreen";
import { WelcomeScreen } from "./welcome-screen/WelcomeScreen";
import { useContact } from "src/headless/react";

export function RootScreen() {
  const { contactCtx } = useContact();
  const shouldCollectData = contactCtx.shouldCollectData();

  return (
    <div className="bg-background size-full" data-test="root-screen">
      <AnimatePresence mode="wait">
        {shouldCollectData ? (
          <MotionDiv
            key="welcome-screen"
            fadeIn="right"
            className="size-full"
            snapExit
            data-test="welcome-screen-container"
          >
            <WelcomeScreen />
          </MotionDiv>
        ) : (
          <MotionDiv
            key="chat-screen"
            fadeIn="right"
            className="size-full"
            snapExit
            data-test="chat-screen-container"
          >
            <ChatScreen />
          </MotionDiv>
        )}
      </AnimatePresence>
    </div>
  );
}
