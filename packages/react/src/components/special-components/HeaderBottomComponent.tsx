import React from 'react';
import { useSpecialComponentProps } from '../../hooks/useSpecialComponentProps';

export function HeaderBottomComponent() {
  const { props } = useSpecialComponentProps();
  const Component = props.config.specialComponents?.headerBottom;

  if (!Component) return null;

  return <Component {...props} />;
}
