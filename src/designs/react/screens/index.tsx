import { AnimatePresence } from "framer-motion";
import React from "react";
import { ChatScreen } from "./chat";
import { WelcomeScreen } from "./welcome";
import { usePreludeData, useWidgetRouter } from "../../../headless/react";
import { MotionDiv } from "../components/lib/MotionDiv";
import { SessionsScreen } from "./sessions";

export function RootScreen() {
  // Call the prelude ASAP so it's cached for all screens
  usePreludeData()

  const {
    routerState: { screen },
  } = useWidgetRouter();

  return (
    <div className="bg-background size-full">
      <AnimatePresence mode="wait">
        {(() => {
          switch (screen) {
            case "welcome":
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

            case "sessions":
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

            case "chat":
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
              const _: never = screen;
              return null;
            }
          }
        })()}
      </AnimatePresence>
    </div>
  );
}
