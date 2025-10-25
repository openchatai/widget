import React from 'react';
import { useComponentContext } from '../../hooks/useComponentContext';

export function HeaderBottomComponent() {
  const props = useComponentContext();
  const Component = props.config.customComponents?.headerBottom;

  if (!Component) return null;

  return <Component {...props} />;
}
