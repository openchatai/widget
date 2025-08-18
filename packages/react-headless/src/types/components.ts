import React from 'react';
import type {
  WidgetAgentMessage,
  WidgetAiMessage,
  WidgetComponentKey,
  WidgetSystemMessageU,
} from '@opencx/widget-core';

export type WidgetComponentProps<TData = unknown> =
  | WidgetAiMessage<TData>
  | WidgetAgentMessage
  | WidgetSystemMessageU;

export type WidgetComponentType = {
  key: WidgetComponentKey;
  component: React.ElementType;
};
