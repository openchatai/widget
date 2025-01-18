import { ComponentProps } from "@react/types";
import React from "react";

type Props = ComponentProps<unknown>;

/**
 * The Basic Fallback component (Rendered when Debug is True and the component key is not found)
 */
export function FallbackComponent(props: Props) {
  return (
    <div className="w-full max-w-full overflow-auto shrink-0" data-test="fallback-container">
      <pre dir="auto" className="text-xs leading-tight" data-test="fallback-content">
        {JSON.stringify(props, null, 1)}
      </pre>
    </div>
  );
}
