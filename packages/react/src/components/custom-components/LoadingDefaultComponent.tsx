import { type Agent } from '@opencx/widget-core';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { dc } from '../../utils/data-component';
import { AgentAvatar } from '../AgentAvatar';
import { MotionDiv } from '../lib/MotionDiv';
import { cn } from '../lib/utils/cn';

export type LoadingComponentProps = {
  agent: Agent | undefined;
};

export function LoadingDefaultComponent({ agent }: LoadingComponentProps) {
  return (
    <AnimatePresence>
      <MotionDiv
        {...dc('chat/bot_loading/root')}
        className="flex flex-row items-end w-full gap-2 animate-pulse"
      >
        <AgentAvatar agent={agent} />
        <div
          {...dc('chat/bot_loading/bouncing_dots_container')}
          className={cn(
            'flex items-center [&_span]:bg-secondary-foreground [&_span]:size-1 gap-1 p-2 rounded-xl bg-secondary',
            // 'border',
          )}
        >
          <motion.span className="rounded-full animate-bounce [animation-delay:-0.3s]" />
          <motion.span className="rounded-full animate-bounce [animation-delay:-0.15s]" />
          <motion.span className="rounded-full animate-bounce" />
        </div>
      </MotionDiv>
    </AnimatePresence>
  );
}
