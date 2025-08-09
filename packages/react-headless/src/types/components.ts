import React from 'react';
import type {
  AgentMessageType,
  BotMessageType,
  WidgetComponentKey,
} from '@opencx/widget-core';

export type WidgetComponentProps<TData = unknown> =
  | BotMessageType<TData>
  | AgentMessageType;

export type WidgetComponentType = {
  key: WidgetComponentKey;
  component: React.ElementType;
};
