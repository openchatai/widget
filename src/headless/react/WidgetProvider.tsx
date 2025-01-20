import { WidgetConfig, WidgetCtx } from "src/headless/core";
import React, { useMemo } from "react";
import { ComponentRegistry } from "./ComponentRegistry";
import { WidgetComponentType } from "./types/components";
import { createSafeContext } from "./utils/create-safe-context";

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
}: {
  options: WidgetConfig;
  children: React.ReactNode;
  components?: WidgetComponentType[];
}) {
  const widgetCtx = useMemo(
    () => new WidgetCtx({ config: options }),
    [options],
  );

  const componentStore = useMemo(
    () =>
      new ComponentRegistry({
        components: components,
      }),
    [components],
  );

  return (
    <SafeProvider
      value={{
        widgetCtx,
        components,
        componentStore,
        version: import.meta.env.__VERSION__,
      }}
    >
      {children}
    </SafeProvider>
  );
}

export { useWidget, WidgetProvider };
