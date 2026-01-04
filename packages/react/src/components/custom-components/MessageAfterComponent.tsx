import React from 'react';
import { useComponentContext } from '../../hooks/useComponentContext';
import type { WidgetMessageU } from '@opencx/widget-core';

export function MessageAfterComponent({
  currentMessage,
}: {
  currentMessage: WidgetMessageU;
}) {
  const props = useComponentContext();

  const Component = props.config.customComponents?.['message::after'];
  if (!Component) return null;

  return <Component {...props} currentMessage={currentMessage} />;
}
