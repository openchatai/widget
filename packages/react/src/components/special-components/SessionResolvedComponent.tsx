import React from 'react';
import { useSpecialComponentProps } from '../../hooks/useSpecialComponentProps';

export function SessionResolvedComponent() {
  const { props } = useSpecialComponentProps();

  if (props.session?.isOpened || !props.session) return null;

  const Component = props.config.specialComponents?.onSessionResolved;
  if (!Component) return null;

  return <Component {...props} />;
}
