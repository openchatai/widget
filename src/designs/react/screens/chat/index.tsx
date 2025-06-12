import React, { useRef } from 'react';
import { cn } from '../../components/lib/utils/cn';
import { ChatFooter } from './ChatFooter';
import { WidgetHeader } from '../../components/WidgetHeader';
import { ChatMain } from './ChatMain';
import { useMessages, useSessions } from '../../../../headless/react';
import { AnimatePresence } from 'framer-motion';
import { MotionDiv } from '../../components/lib/MotionDiv';
import { Loading } from '../../components/lib/loading';
import { useTheme } from '../../hooks/useTheme';
import { useWidgetSize } from '../../hooks/useWidgetSize';
import { OpenCxComponentName } from '../../../../headless/core';

export function ChatScreen() {
  const {
    messagesState: { isInitialFetchLoading },
  } = useMessages();
  const {
    sessionState: { session },
  } = useSessions();
  const { theme } = useTheme();

  useWidgetSize({
    width: theme.screens.chat.width,
    height: theme.screens.chat.height,
  });

  // The key is the session id, so that when chat is reset, the animation replays
  const chatContentKeyRef = useRef(session?.id || 'chat').current;

  return (
    <div
      data-component={OpenCxComponentName['chat-screen__root']}
      className={cn('flex flex-col overflow-hidden')}
      style={{
        width: '100vw', // Relative to the iframe
        maxWidth: '100vw', // Relative to the iframe
        height: '100vh', // Relative to the iframe
        maxHeight: '100vh', // Relative to the iframe
      }}
    >
      <div className="size-full justify-between flex flex-col">
        <WidgetHeader
          componentName={OpenCxComponentName['chat-screen__header']}
        />
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
