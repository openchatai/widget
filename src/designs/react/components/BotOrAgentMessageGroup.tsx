import React from 'react';
import {
  OpenCxComponentName,
  type AgentMessageType,
  type AgentOrBotType,
  type BotMessageType,
} from '../../../headless/core';
import { AgentOrBotAvatar } from './AgentOrBotAvatar';
import { BotOrAgentMessage } from './BotOrAgentMessage';
import { Tooltippy } from './lib/tooltip';
import { cn } from './lib/utils/cn';
import { SuggestedReplyButton } from './SuggestedReplyButton';

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
      data-component={
        OpenCxComponentName['chat_screen/agent_or_bot_messages_group']
      }
      className={cn('flex flex-col items-start gap-2')}
    >
      <Tooltippy content={agent?.name} side="right" align="end">
        <AgentOrBotAvatar agent={agent} />
      </Tooltippy>
      <div
        data-component={
          OpenCxComponentName[
            'chat_screen/agent_or_bot_messages_group/messages_container'
          ]
        }
        className={cn('flex flex-col gap-2')}
      >
        {messages.map((message) => (
          <BotOrAgentMessage key={message.id} {...message} />
        ))}
        {suggestedReplies?.map((suggestion) => (
          <SuggestedReplyButton key={suggestion} suggestion={suggestion} />
        ))}
      </div>
    </div>
  );
}
