import { WidgetConfig, createChat, ApiCaller } from "core";
import { WidgetComponentType } from "react-web/types";
import { createSafeContext } from "react-web/utils/create-safe-context";
import React, { useMemo, useEffect, useState } from "react";
import { ComponentRegistry } from "./components";
import { TranslationKeysType } from "./locales/en.locale";
import { getTranslation, isSupportedLocale, Locale } from "./locales";
import { z } from "zod";

interface InitializeChatOptions {
  widgetConfig: WidgetConfig;
}

const widgetSettingsSchema = z.object({
  persistSession: z.boolean().optional(),
  playSoundEffects: z.boolean().optional(),
});

function useInitializeChat({ widgetConfig }: InitializeChatOptions) {
  const [widgetSettings, setWidgetSettings] = useState<
    z.infer<typeof widgetSettingsSchema>
  >({
    persistSession: widgetConfig.settings?.persistSession ?? false,
    playSoundEffects: widgetConfig.settings?.playSoundEffects ?? false,
  });

  const config: WidgetConfig = {
    ...widgetConfig,
    settings: widgetSettings,
  };

  const api = useMemo(() => {
    return new ApiCaller({
      config: config,
    });
  }, [config]);

  const chat = useMemo(() => {
    return createChat({
      api,
      config,
    });
  }, [config, api]);

  useEffect(() => {
    return () => {
      chat.cleanup();
    };
  }, [chat]);

  return {
    config,
    chat,
    api,
    widgetSettings,
    setWidgetSettings,
  };
}

interface ChatProviderValue extends ReturnType<typeof useInitializeChat> {
  components?: WidgetComponentType[];
  componentStore: ComponentRegistry;
  version: string;
  locale: {
    get: (key: TranslationKeysType) => string;
    lang: Locale;
  };
}

const [useChat, SafeProvider] = createSafeContext<ChatProviderValue>();

interface ChatProviderProps {
  options: WidgetConfig;
  children: React.ReactNode;
  components?: WidgetComponentType[];
}

function ChatProvider({ options, children, components }: ChatProviderProps) {
  const context = useInitializeChat({ widgetConfig: options });

  const componentStore = useMemo(
    () =>
      new ComponentRegistry({
        components: components,
      }),
    [components],
  );

  const locale = useMemo<ChatProviderValue["locale"]>(() => {
    const config = context.config;
    const language: Locale = isSupportedLocale(config.language)
      ? config.language
      : "en";
    return {
      get: (key: TranslationKeysType) => getTranslation(key, language),
      lang: language,
    };
  }, [context.config.language]);

  return (
    <SafeProvider
      value={{
        ...context,
        componentStore,
        version: import.meta.env.__VERSION__,
        locale,
      }}
    >
      {children}
    </SafeProvider>
  );
}

export { useChat, ChatProvider };
