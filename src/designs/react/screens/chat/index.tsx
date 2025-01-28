import React from "react";
import { cn } from "../../components/lib/utils/cn";
import { DEFAULT_STYLES, WIDGET_CONTENT_MAX_HEIGHT_PX } from "../../constants";
import { useWidgetContentHeight } from "../../hooks/useWidgetContentHeight";
import { ChatFooter } from "./ChatFooter";
import { ChatHeader } from "./ChatHeader";
import { ChatMain } from "./ChatMain";
import { useMessages, useSession } from "../../../../headless/react";
import { AnimatePresence } from "framer-motion";
import { MotionDiv } from "../../components/lib/MotionDiv";
import { Loading } from "../../components/lib/loading";

export function ChatScreen() {
  const {
    messagesState: { isInitialFetchLoading },
  } = useMessages();
  const {
    sessionState: { session },
  } = useSession();
  const { observedElementRef } = useWidgetContentHeight({
    fallbackHeight: WIDGET_CONTENT_MAX_HEIGHT_PX,
  });

  return (
    <div
      ref={observedElementRef}
      data-test="chat-screen"
      className={cn(
        DEFAULT_STYLES.widgetHeight,
        "w-full flex flex-col overflow-hidden bg-background",
      )}
    >
      <div
        className="w-full h-full justify-between flex flex-col relative"
        data-test="chat-screen-content"
      >
        <ChatHeader />
        <AnimatePresence mode="wait">
          {isInitialFetchLoading ? (
            <MotionDiv
              key="loading"
              className="flex flex-col items-center justify-center w-full flex-1"
            >
              <Loading />
            </MotionDiv>
          ) : (
            <MotionDiv
              // The key is the session id, so that when chat is reset, the animation replays
              key={session?.id || "chat"}
              className="flex flex-col w-full flex-1 overflow-auto"
              // If we don't snap exit, the initial questions will show before the animation starts
              snapExit
            >
              <ChatMain />
              <ChatFooter />
            </MotionDiv>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
