import React from "react";
import type { WidgetComponentProps } from "../../../headless/react/types/components";

type Props = WidgetComponentProps<unknown>;

/**
 * The Basic Fallback component (Rendered when Debug is True and the component key is not found)
 */
export function FallbackComponent(props: Props) {
  return (
    <div className="w-full max-w-full overflow-auto shrink-0">
      <pre dir="auto" className="text-xs leading-tight">
        {JSON.stringify(props, null, 1)}
      </pre>
    </div>
  );
}
