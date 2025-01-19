import { WidgetConfig, WidgetCtx } from "core";
import { WidgetComponentType } from "react-web/types";
import { createSafeContext } from "react-web/utils/create-safe-context";
import React, { useMemo, useState } from "react";
import { ComponentRegistry } from "./components";
import { TranslationKeysType } from "./locales/en.locale";
import { getTranslation, isSupportedLocale, Locale } from "./locales";

interface WidgetProviderValue {
  widgetCtx: WidgetCtx;
  components?: WidgetComponentType[];
  componentStore: ComponentRegistry;
  version: string;
  locale: {
    get: (key: TranslationKeysType) => string;
    lang: Locale;
  };
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

  const locale = useMemo<WidgetProviderValue["locale"]>(() => {
    const config = widgetCtx.config;
    const language: Locale = isSupportedLocale(config.language)
      ? config.language
      : "en";
    return {
      get: (key: TranslationKeysType) => getTranslation(key, language),
      lang: language,
    };
  }, [widgetCtx.config.language]);

  return (
    <SafeProvider
      value={{
        widgetCtx,
        components,
        componentStore,
        version: import.meta.env.__VERSION__,
        locale,
      }}
    >
      {children}
    </SafeProvider>
  );
}

export { useWidget, WidgetProvider };
