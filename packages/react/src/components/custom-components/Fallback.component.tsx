import type { WidgetComponentProps } from '@opencx/widget-react-headless';
import React from 'react';

/**
 * The Basic Fallback component (Rendered when Debug is True and the component key is not found)
 */
export function FallbackComponent(props: WidgetComponentProps) {
  return (
    <div className="w-full max-w-full overflow-auto shrink-0">
      <pre className="text-xs leading-tight whitespace-pre-wrap break-word">
        {JSON.stringify(props, null, 1)}
      </pre>
    </div>
  );
}
