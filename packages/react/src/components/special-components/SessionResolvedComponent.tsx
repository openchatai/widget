import {
  useSessions,
  useConfig,
  useWidget,
} from '@opencx/widget-react-headless';
import React from 'react';

export function SessionResolvedComponent() {
  const {
    widgetCtx: { org },
  } = useWidget();
  const {
    sessionState: { session },
  } = useSessions();
  const config = useConfig();

  if (session?.isOpened || !session) return null;

  const Component = config.specialComponents?.onSessionResolved;
  if (!Component) return null;

  return (
    <Component react={React} session={session} config={config} org={org} />
  );
}
