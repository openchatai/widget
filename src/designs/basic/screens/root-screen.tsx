import { MotionDiv } from "@ui/MotionDiv";
import { AnimatePresence } from "framer-motion";
import React from "react";
import { useShouldCollectUserData } from "src/hooks/useShouldCollectData";
import { ChatScreen } from "./chat-screen/ChatScreen";
import { WelcomeScreen } from "./welcome-screen/WelcomeScreen";

export function RootScreen() {
  const { shouldCollectDataFirst } = useShouldCollectUserData();

  return (
    <div className="bg-background size-full">
      <AnimatePresence mode="wait">
        {shouldCollectDataFirst ? (
          <MotionDiv
            key="welcome-screen"
            fadeIn="right"
            className="size-full"
            snapExit
          >
            <WelcomeScreen />
          </MotionDiv>
        ) : (
          <MotionDiv
            key="chat-screen"
            fadeIn="right"
            className="size-full"
            snapExit
          >
            <ChatScreen />
          </MotionDiv>
        )}
      </AnimatePresence>
    </div>
  );
}
