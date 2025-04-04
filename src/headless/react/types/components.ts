import React from 'react';
import type {
  AgentMessageType,
  BotMessageType,
  WidgetComponentKey,
} from '../../core';

export type WidgetComponentProps<TData = unknown> =
  | BotMessageType<TData>
  | AgentMessageType;

export type WidgetComponentType = {
  key: WidgetComponentKey;
  component: React.ElementType;
};
