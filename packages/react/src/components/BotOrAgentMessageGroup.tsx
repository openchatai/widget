import {
  type AgentMessageType,
  type AgentOrBotType,
  type BotMessageType,
} from '@opencx/widget-core';
import React from 'react';
import { dc } from '../utils/data-component';
import { AgentOrBotAvatar } from './AgentOrBotAvatar';
import { BotOrAgentMessage } from './BotOrAgentMessage';
import { Tooltippy } from './lib/tooltip';
import { cn } from './lib/utils/cn';
import { SuggestedReplyButton } from './SuggestedReplyButton';
import { GroupTimestamp } from './GroupTimestamp';

export function BotOrAgentMessageGroup({
  messages,
  agent,
  suggestedReplies,
}: {
  messages: BotMessageType[] | AgentMessageType[];
  agent: AgentOrBotType | undefined;
  suggestedReplies?: string[];
}) {
  return (
    <div
      {...dc('chat/agent_msg_group/root')}
      className={cn('flex items-end gap-2')}
    >
      <Tooltippy content={agent?.name} side="right" align="end">
        <AgentOrBotAvatar
          {...dc('chat/agent_msg_group/root/avatar')}
          agent={agent}
          className="hidden"
        />
      </Tooltippy>

      <div className={cn('flex-1 flex flex-col gap-1')}>
        <div
          {...dc('chat/agent_msg_group/avatar_and_msgs/root')}
          className={cn('flex items-end gap-2')}
        >
          <Tooltippy content={agent?.name} side="right" align="end">
            <AgentOrBotAvatar
              {...dc('chat/agent_msg_group/avatar_and_msgs/avatar')}
              agent={agent}
            />
          </Tooltippy>
          <div
            {...dc('chat/agent_msg_group/avatar_and_msgs/msgs')}
            className={cn('flex-1 flex flex-col gap-1')}
          >
            {messages.map((message, index, array) => (
              <BotOrAgentMessage
                key={message.id}
                isFirstInGroup={index === 0}
                isLastInGroup={index === array.length - 1}
                isAloneInGroup={array.length === 1}
                {...message}
              />
            ))}
            <GroupTimestamp messages={messages} />
          </div>
        </div>

        {suggestedReplies && suggestedReplies.length > 0 && (
          <div
            {...dc('chat/agent_msg_group/suggestions')}
            className={cn('flex flex-col gap-1 ps-8')}
          >
            {suggestedReplies?.map((suggestion, index) => (
              <SuggestedReplyButton
                key={`${suggestion}-${index}`}
                suggestion={suggestion}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
