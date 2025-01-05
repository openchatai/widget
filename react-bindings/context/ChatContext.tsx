import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { createChat, createContact, createConfig, CoreOptions, ApiCaller } from '../../core';

interface ChatProviderProps {
    options: CoreOptions;
    children: React.ReactNode;
}

function useInitChat(options: CoreOptions) {
    const client = useMemo(() => {
        const config = createConfig(options);

        const api = new ApiCaller({
            apiUrl: config.getApiConfig().apiUrl,
            token: config.getApiConfig().token,
            coreOptions: options,
        });

        const contact = createContact({
            api,
            botToken: options.token,
            platform: {
                env: {
                    platform: 'browser',
                },
                date: {
                    now: () => Date.now(),
                    toISOString: (date: number) => new Date(date).toISOString(),
                },
            },
            collectUserData: options.settings?.persistSession,
            user: options.user,
        });

        const chat = createChat({
            api,
            persistSession: options.settings?.persistSession,
            useSoundEffects: options.settings?.useSoundEffects,
        });

        return {
            api,
            config,
            chat,
            contact,
        }
    }, [options]);

    useEffect(() => {
        return () => {
            client.chat.cleanup();
            client.contact.cleanup();
        };
    }, [client]);

    return client;
}

const ChatContext = createContext<ReturnType<typeof useInitChat>>({} as ReturnType<typeof useInitChat>);

export const ChatProvider: React.FC<ChatProviderProps> = ({ options, children }) => {
    const client = useInitChat(options);
    return (
        <ChatContext.Provider value={client}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChat = () => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error('useChat must be used within a ChatProvider');
    }
    return context;
}; 