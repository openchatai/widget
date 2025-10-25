import React, { type ReactNode } from 'react';
import { useComponentContext } from '../../hooks/useComponentContext';

export function HeaderTitleComponent({ fallback }: { fallback: ReactNode }) {
  const props = useComponentContext();
  const Component = props.config.customComponents?.headerTitle;

  if (!Component) return fallback;

  return <Component {...props} />;
}
