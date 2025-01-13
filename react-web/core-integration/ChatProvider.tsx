import { CoreOptions, createChat, createConfig, ApiCaller, Platform, createLogger, isStorageAvailable } from "@core/index"
import { ComponentType } from "@react/types";
import { createSafeContext } from "@react/utils/create-safe-context";
import React, { useMemo, useEffect, useState } from "react";
import { ComponentRegistry } from "./components";
import { TranslationKeysType } from "./locales/en.locale";
import { getStr, LangType } from "./locales";
import { WidgetSettings } from "@core/client/config";
import { z } from "zod";

const defaultStorage = {
    getItem: async (key: string) => localStorage.getItem(key),
    setItem: async (key: string, value: string) => localStorage.setItem(key, value),
    removeItem: async (key: string) => localStorage.removeItem(key),
    isAvailable: () => true
};

const defaultPlatform: Platform = {
    env: {
        platform: 'web'
    },
    storage: defaultStorage,
    logger: createLogger({ level: "debug" })
};

interface InitializeChatOptions {
    options: CoreOptions;
    platform?: Partial<Platform>;
}

const widgetSettingsSchema = z.object({
    persistSession: z.boolean().optional(),
    useSoundEffects: z.boolean().optional(),
})

function useInitializeChat({ options, platform: customPlatform }: InitializeChatOptions) {
    const [widgetSettings, setWidgetSettings] = useState<z.infer<typeof widgetSettingsSchema>>({
        persistSession: options.settings?.persistSession ?? false,
        useSoundEffects: options.settings?.useSoundEffects ?? false,
    })

    const platform = useMemo<Platform>(() => {
        return {
            env: {
                platform: customPlatform?.env?.platform ?? defaultPlatform.env.platform
            },
            storage: customPlatform?.storage ?? defaultPlatform.storage,
            logger: customPlatform?.logger ?? defaultPlatform.logger,
            audio: customPlatform?.audio ?? defaultPlatform.audio
        };
    }, [customPlatform])

    const config = useMemo(() => {
        return createConfig({
            ...options,
            settings: widgetSettings,
        }, platform);
    }, [options, platform, widgetSettings])

    // Load initial settings from storage only once
    useEffect(() => {
        const init = async () => {
            if (isStorageAvailable(platform.storage)) {
                try {
                    const settings = await platform.storage.getItem(`${options.token}:settings`);
                    if (settings) {
                        const parsedSettings = widgetSettingsSchema.parse(JSON.parse(settings));
                        setWidgetSettings(prev => ({
                            ...prev,
                            ...parsedSettings
                        }));
                    }
                } catch (error) {
                    console.error('Failed to load settings:', error);
                }
            }
        };
        init();
    }, [platform.storage, options.token]);

    const api = useMemo(() => {
        return new ApiCaller({
            config: config.getConfig(),
        });
    }, [config.config])

    const chat = useMemo(() => {
        return createChat({
            api,
            config,
            platform,
        });
    }, [config, platform, api]);

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
    }
}

interface ChatProviderValue extends ReturnType<typeof useInitializeChat> {
    components?: ComponentType[];
    componentStore: ComponentRegistry;
    version: string;
    locale: {
        get: (key: TranslationKeysType, pfx?: string) => string;
        lang: LangType;
    }
}

const [useChat, SafeProvider] = createSafeContext<ChatProviderValue>();

interface ChatProviderProps {
    options: CoreOptions;
    children: React.ReactNode;
    components?: ComponentType[];
    platform?: Partial<Platform>;
}

function ChatProvider({ options, children, components, platform }: ChatProviderProps) {
    const context = useInitializeChat({ options, platform });

    const componentStore = useMemo(
        () =>
            new ComponentRegistry({
                components: components,
            }),
        [components],
    );

    const locale = useMemo<ChatProviderValue["locale"]>(() => {
        const config = context.config.getConfig()
        return {
            get: (key: TranslationKeysType, pfx?: string) => getStr(key, config.language as LangType) + (pfx ?? ""),
            lang: config.language as LangType,
        }
    }, [context.config.getConfig().language]);

    return <SafeProvider value={{ ...context, componentStore, version: import.meta.env.__VERSION__, locale }}>
        {children}
    </SafeProvider>
}

export { useChat, ChatProvider };