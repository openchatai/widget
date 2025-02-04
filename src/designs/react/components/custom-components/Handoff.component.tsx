import React from "react";
import type { WidgetComponentProps } from "../../../../headless/react";

export function HandoffComponent({ data }: WidgetComponentProps) {
  return (
    <div className="w-full max-w-full overflow-auto shrink-0 p-2 rounded-2xl border bg-secondary">
      <p className="text-sm font-bold">Handoff Custom Component</p>
      <pre
        dir="auto"
        className="text-xs leading-tight whitespace-pre-wrap break-words"
      >
        {JSON.stringify({ ...data }, null, 2)}
      </pre>
    </div>
  );
}
