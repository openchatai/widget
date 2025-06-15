import React from 'react';
import {
  OpenCxComponentName,
  type AgentOrBotType,
} from '../../../headless/core';
import { Avatar, AvatarFallback, AvatarImage } from './lib/avatar';

export function AgentOrBotAvatar({
  agent,
}: {
  agent: AgentOrBotType | undefined;
}) {
  return (
    <Avatar
      data-component={
        OpenCxComponentName['chat_screen/agent_or_bot_avatar/root']
      }
    >
      <AvatarImage src={agent?.avatar ?? ''} alt="Agent Icon" />
      {agent?.name && (
        <AvatarFallback>
          {agent?.name?.slice(0, 1)?.toUpperCase()}
        </AvatarFallback>
      )}
    </Avatar>
  );
}
