import type { WidgetComponentProps } from '@opencx/widget-react-headless';
import React from 'react';

export function HandoffComponent({ data }: WidgetComponentProps) {
  return (
    <div className="w-full max-w-full overflow-auto shrink-0 p-2 rounded-2xl bg-secondary">
      <p className="text-sm font-bold">Handoff Custom Component</p>
      <pre className="text-xs leading-tight whitespace-pre-wrap break-words">
        {JSON.stringify({ ...data }, null, 2)}
      </pre>
    </div>
  );
}
