import { CoreOptions, createChat, createConfig, ApiCaller, Platform, createLogger } from "@core/index"
import { ComponentType } from "@react/types";
import { createSafeContext } from "@react/utils/create-safe-context";
import React, { useMemo, useEffect } from "react";
import { ComponentRegistry } from "./components";
import { TranslationKeysType } from "./locales/en.locale";
import { getStr, LangType } from "./locales";

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

function useInitializeChat({ options, platform: customPlatform }: InitializeChatOptions) {
    const context = useMemo(() => {
        const platform: Platform = {
            env: {
                platform: customPlatform?.env?.platform ?? defaultPlatform.env.platform
            },
            storage: customPlatform?.storage ?? defaultPlatform.storage,
            logger: customPlatform?.logger ?? defaultPlatform.logger,
            audio: customPlatform?.audio ?? defaultPlatform.audio
        };

        const config = createConfig(options, platform);
        const api = new ApiCaller({
            config: config.getConfig(),
        });

        const chat = createChat({
            api,
            config,
            platform,
        });


        return {
            chat,
            api,
            config,
            platform,
        };
    }, [options, customPlatform]);

    useEffect(() => {
        return () => {
            context.chat.cleanup();
        };
    }, []);

    return context;
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