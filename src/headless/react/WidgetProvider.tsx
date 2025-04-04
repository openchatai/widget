import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ComponentRegistry } from './ComponentRegistry';
import type { WidgetComponentType } from './types/components';
import { createSafeContext } from './utils/create-safe-context';
import { type ExternalStorage, type WidgetConfig, WidgetCtx } from '../core';
import { version } from '../../../package.json';

interface WidgetProviderValue {
  widgetCtx: WidgetCtx;
  components?: WidgetComponentType[];
  componentStore: ComponentRegistry;
  version: string;
}

const [useWidget, SafeProvider] = createSafeContext<WidgetProviderValue>();

function WidgetProvider({
  options: config,

  children,
  components,
  storage,
}: {
  options: WidgetConfig;
  children: React.ReactNode;
  components?: WidgetComponentType[];
  storage?: ExternalStorage;
}) {
  const didInitialize = useRef(false);
  const [widgetCtx, setWidgetCtx] = useState<WidgetCtx | null>(null);

  const componentStore = useMemo(
    () =>
      new ComponentRegistry({
        components: components,
      }),
    [components],
  );

  useEffect(() => {
    if (didInitialize.current) return;
    didInitialize.current = true;

    WidgetCtx.initialize({ config, storage }).then(setWidgetCtx);
  }, []);

  if (!widgetCtx) return null;

  return (
    <SafeProvider
      value={{
        widgetCtx,
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
