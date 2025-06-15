import React from 'react';
import { type AgentOrBotType } from '../../../headless/core';
import { Avatar, AvatarFallback, AvatarImage } from './lib/avatar';
import type { AvatarProps } from '@radix-ui/react-avatar';

export function AgentOrBotAvatar({
  agent,
  ...props
}: AvatarProps & {
  agent: AgentOrBotType | undefined;
}) {
  return (
    <Avatar {...props}>
      <AvatarImage src={agent?.avatar ?? ''} alt="Agent Icon" />
      {agent?.name && (
        <AvatarFallback>
          {agent?.name?.slice(0, 1)?.toUpperCase()}
        </AvatarFallback>
      )}
    </Avatar>
  );
}
