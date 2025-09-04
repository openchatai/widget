import React from 'react';
import { useSpecialComponentProps } from '../../hooks/useSpecialComponentProps';

export function ChatBottomComponents() {
  const { props } = useSpecialComponentProps();
  const components = props.config.specialComponents?.chatBottomComponents;

  if (!components) return null;

  return (
    <div>
      {components.map(({ key, component: Component }) => (
        <Component key={key} {...props} />
      ))}
    </div>
  );
}
