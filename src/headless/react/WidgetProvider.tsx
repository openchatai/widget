import React, { useMemo, useRef } from "react";
import { ComponentRegistry } from "./ComponentRegistry";
import type { WidgetComponentType } from "./types/components";
import { createSafeContext } from "./utils/create-safe-context";
import { type ExternalStorage, type WidgetConfig, WidgetCtx } from "../core";
import { version } from "../../../package.json";

interface WidgetProviderValue {
  widgetCtx: WidgetCtx;
  components?: WidgetComponentType[];
  componentStore: ComponentRegistry;
  version: string;
}

const [useWidget, SafeProvider] = createSafeContext<WidgetProviderValue>();

function WidgetProvider({
  options,
  children,
  components,
  storage,
}: {
  options: WidgetConfig;
  children: React.ReactNode;
  components?: WidgetComponentType[];
  storage?: ExternalStorage;
}) {
  /**
   * If the WidgetCtx is constructed inside the initializer of the useRef, 
   * it will run on every render even though it will not replace the initially created WidgetCtx.
   * This will cause leaks... for polling and whatnot.
   * 
   * Initializing the WidgetCtx outside the useRef will make doubly sure that it only runs once.
   */
  const widgetCtx = useRef<WidgetCtx | null>(null);
  if (!widgetCtx.current) {
    widgetCtx.current = new WidgetCtx({
      config: options,
      storage,
    });
  }

  const componentStore = useMemo(
    () =>
      new ComponentRegistry({
        components: components,
      }),
    [components],
  );

  if (!widgetCtx.current) return null;

  return (
    <SafeProvider
      value={{
        widgetCtx: widgetCtx.current,
        components,
        componentStore,
        version,
      }}
    >
      {children}
    </SafeProvider>
  );
}

export { useWidget, WidgetProvider };
