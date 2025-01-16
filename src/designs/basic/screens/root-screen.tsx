import { MotionDiv } from "@ui/MotionDiv";
import { AnimatePresence } from "framer-motion";
import React from "react";
import { ChatScreen } from "./chat-screen/ChatScreen";
import { WelcomeScreen } from "./welcome-screen/WelcomeScreen";
import { useContact } from "@react/core-integration";

export function RootScreen() {
  const { contactManager } = useContact()
  const shouldCollectData = contactManager.shouldCollectData()
  return (
    <div className="bg-background size-full">
      <AnimatePresence mode="wait">
        {shouldCollectData ? (
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
