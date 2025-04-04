import React, { useRef } from 'react';
import { cn } from '../../components/lib/utils/cn';
import { DEFAULT_STYLES, WIDGET_CONTENT_MAX_HEIGHT_PX } from '../../constants';
import { useWidgetContentHeight } from '../../hooks/useWidgetContentHeight';
import { ChatFooter } from './ChatFooter';
import { WidgetHeader } from '../../components/WidgetHeader';
import { ChatMain } from './ChatMain';
import { useMessages, useSessions } from '../../../../headless/react';
import { AnimatePresence } from 'framer-motion';
import { MotionDiv } from '../../components/lib/MotionDiv';
import { Loading } from '../../components/lib/loading';

export function ChatScreen() {
  const {
    messagesState: { isInitialFetchLoading },
  } = useMessages();
  const {
    sessionState: { session },
  } = useSessions();
  const { observedElementRef } = useWidgetContentHeight({
    fallbackHeight: WIDGET_CONTENT_MAX_HEIGHT_PX,
  });

  // The key is the session id, so that when chat is reset, the animation replays
  const chatContentKeyRef = useRef(session?.id || 'chat').current;

  return (
    <div
      ref={observedElementRef}
      className={cn(
        DEFAULT_STYLES.widgetHeight,
        'w-full flex flex-col overflow-hidden bg-background',
      )}
    >
      <div className="size-full justify-between flex flex-col">
        <WidgetHeader />
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
              key={chatContentKeyRef}
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
