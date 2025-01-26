import { AnimatePresence } from "framer-motion";
import React from "react";
import { ChatScreen } from "./chat";
import { WelcomeScreen } from "./welcome";
import { useContact } from "../../../headless/react";
import { MotionDiv } from "../components/lib/MotionDiv";
import { useWidgetRouter } from "../../../headless/react/hooks/useWidgetRouter";

export function RootScreen() {
  const {
    routerState: { screen },
  } = useWidgetRouter();

  return (
    <div className="bg-background size-full" data-test="root-screen">
      <AnimatePresence mode="wait">
        {screen === "welcome" ? (
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
