import React from 'react';
import { useComponentContext } from '../../hooks/useComponentContext';

export function SessionResolvedComponent() {
  const props = useComponentContext();

  if (props.session?.isOpened || !props.session) return null;

  const Component = props.config.customComponents?.onSessionResolved;
  if (!Component) return null;

  return <Component {...props} />;
}
