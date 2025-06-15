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

export function BotOrAgentMessageGroup({
  messages,
  agent,
}: {
  messages: BotMessageType[] | AgentMessageType[];
  agent: AgentOrBotType | undefined;
}) {
  return (
    <div
      data-component={
        OpenCxComponentName['chat-screen__agent-or-bot-messages-group']
      }
      className={cn('flex flex-col items-start gap-2')}
    >
      <Tooltippy content={agent?.name} side="right" align="end">
        <AgentOrBotAvatar agent={agent} />
      </Tooltippy>
      {messages.map((message) => (
        <BotOrAgentMessage key={message.id} {...message} />
      ))}
    </div>
  );
}
