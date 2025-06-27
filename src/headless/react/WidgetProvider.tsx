import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { version } from '../../../package.json';
import { type ExternalStorage, type WidgetConfig, WidgetCtx } from '../core';
import { ComponentRegistry } from './ComponentRegistry';
import type { WidgetComponentType } from './types/components';

interface WidgetProviderValue {
  widgetCtx: WidgetCtx;
  config: WidgetConfig;
  components?: WidgetComponentType[];
  componentStore: ComponentRegistry;
  version: string;
  contentIframeRef?: React.MutableRefObject<HTMLIFrameElement | null>;
}

const context = createContext<WidgetProviderValue | null>(null);

export function WidgetProvider({
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
  const contentIframeRef = useRef<HTMLIFrameElement | null>(null);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!widgetCtx) return children;

  return (
    <context.Provider
      value={{
        widgetCtx,
        config,
        components,
        componentStore,
        version,
        contentIframeRef,
      }}
    >
      {children}
    </context.Provider>
  );
}

export function useWidget() {
  const ctx = useContext(context);
  if (!ctx) {
    throw new Error('useWidget must be used within a WidgetProvider');
  }
  return ctx;
}
