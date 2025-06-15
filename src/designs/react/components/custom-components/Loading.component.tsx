import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import {
  OpenCxComponentName,
  type AgentOrBotType,
} from '../../../../headless/core';
import { AgentOrBotAvatar } from '../AgentOrBotAvatar';
import { MotionDiv } from '../lib/MotionDiv';

export type LoadingComponentProps = {
  agent: AgentOrBotType | undefined;
};

export function BotLoadingComponent({ agent }: LoadingComponentProps) {
  return (
    <AnimatePresence>
      <MotionDiv
        data-component={OpenCxComponentName['chat-screen__bot-loading__root']}
        className="flex flex-row items-end w-full gap-2 animate-pulse"
      >
        <AgentOrBotAvatar agent={agent} />
        <div
          data-component={
            OpenCxComponentName[
              'chat-screen__bot-loading__bouncing-dots-container'
            ]
          }
          className="flex items-center [&_span]:bg-secondary-foreground [&_span]:size-1 gap-1 p-2 rounded-xl bg-secondary border"
        >
          <motion.span className="rounded-full animate-bounce [animation-delay:-0.3s]" />
          <motion.span className="rounded-full animate-bounce [animation-delay:-0.15s]" />
          <motion.span className="rounded-full animate-bounce" />
        </div>
      </MotionDiv>
    </AnimatePresence>
  );
}
