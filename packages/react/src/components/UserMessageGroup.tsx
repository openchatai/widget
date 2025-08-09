import type { UserMessageType } from '@opencx/widget-core';
import React from 'react';
import { dc } from '../utils/data-component';
import { cn } from './lib/utils/cn';
import { UserMessage } from './UserMessage';

export function UserMessageGroup({
  messages,
}: {
  messages: UserMessageType[];
}) {
  return (
    <div
      {...dc('chat/user_msg_group/root')}
      className={cn('group', 'flex flex-col gap-1 justify-end items-end')}
    >
      {messages.map((message, index, array) => (
        <UserMessage
          key={message.id}
          message={message}
          isFirstInGroup={index === 0}
          isLastInGroup={index === array.length - 1}
          isAloneInGroup={array.length === 1}
        />
      ))}
    </div>
  );
}
