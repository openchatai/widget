import type { SpecialComponentProps } from '@opencx/widget-core';
import {
  useSessions,
  useConfig,
  useWidget,
  useMessages,
  useWidgetRouter,
} from '@opencx/widget-react-headless';
import React from 'react';

export function useSpecialComponentProps(): { props: SpecialComponentProps } {
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
    props: {
      react: React,
      org,
      session,
      config,
      messages,
      currentScreen: screen,
    },
  };
}
