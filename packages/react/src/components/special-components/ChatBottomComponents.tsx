import React from 'react';
import { useComponentContext } from '../../hooks/useComponentContext';

export function ChatBottomComponents() {
  const props = useComponentContext();
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
