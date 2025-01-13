import { CoreOptions, createChat, createConfig, ApiCaller, createContact, Platform } from "@core/index"
import { ComponentType } from "@react/types";
import { createSafeContext } from "@react/utils/create-safe-context";
import React, { useMemo, useEffect } from "react";
import { ComponentRegistry } from "./components";
import { TranslationKeysType } from "./locales/en.locale";
import { getStr, LangType } from "./locales";

const platform: Platform = {
    env: {
        platform: 'web'
    },
    storage: {
        getItem: async (key: string) => {
            return localStorage.getItem(key);
        },
        setItem: async (key: string, value: string) => {
            localStorage.setItem(key, value);
        },
        removeItem: async (key: string) => {
            localStorage.removeItem(key);
        }
    },
}

function useInitializeChat(options: CoreOptions) {
    const context = useMemo(() => {
        const config = createConfig(options, platform);
        const api = new ApiCaller({
            config: config.getConfig(),
        });

        const chat = createChat({
            api,
            config,
            platform,
        });

        const contact = createContact({
            api,
            config,
            platform,
        });

        return {
            chat,
            contact,
            api,
            config,
            platform,
        };
    }, [options]);

    useEffect(() => {
        return () => {
            context.contact.cleanup();
            context.chat.cleanup();
        };
    }, [context]);

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

function ChatProvider({ options, children, components }: {
    options: CoreOptions, children: React.ReactNode,
    components?: ComponentType[];
}) {
    const context = useInitializeChat(options);

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