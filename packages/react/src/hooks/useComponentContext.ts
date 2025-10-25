import type { ComponentContext } from '@opencx/widget-core';
import {
  useSessions,
  useConfig,
  useWidget,
  useMessages,
  useWidgetRouter,
} from '@opencx/widget-react-headless';
import React from 'react';

export function useComponentContext(): ComponentContext {
  const {
    widgetCtx: { org },
  } = useWidget();
  const {
    sessionState: { session },
  } = useSessions();
  const config = useConfig();
  const {
    messagesState: { messages },
  } = useMessages();
  const {
    routerState: { screen },
  } = useWidgetRouter();

  return {
    react: React,
    org,
    session,
    config,
    messages,
    currentScreen: screen,
  };
}
