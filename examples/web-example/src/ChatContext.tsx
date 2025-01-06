import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
    createChat,
    createConfig,
    ApiCaller,
    createContact,
    Platform,
} from '../../../core';
import { createLogger } from '../../../core/platform/logger';

type PreludeData = {
    organizationName: string;
    initialQuestions: string[];
};

const socketUrl = 'http://localhost:8080';
const apiUrl = 'http://localhost:8080/backend';


export const platform: Platform = {
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
    logger: createLogger({
        level: 'debug',
        prefix: '[OpenChat]',
        enabled: true
    })
};

const ChatContext = createContext<ReturnType<typeof useInitChat> & {
    prelude: PreludeData | null;
    isLoading: boolean;
}>({} as any);

const useInitChat = () => {
    const chat = useMemo(() => {
        const config = createConfig({
            token: '6cb3b1b746e45441b4d2a874dd60d44a',
            socketUrl,
            apiUrl,
            settings: {
                persistSession: true,
            },
            user: {
                email: "test@test.com",
                name: "Test User"
            }
        });
        const api = new ApiCaller({
            config: config.getConfig(),
        });
        const chat = createChat({
            api,
            config,
            platform
        });
        const contact = createContact({
            api,
            config,
            platform
        });
        return {
            chat,
            contact,
            api,
            config,
            platform
        }
    }, []);

    useEffect(() => {
        return () => {
            chat.contact.cleanup();
            chat.chat.cleanup();
        };
    }, []);

    return chat;
}

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [prelude, setPrelude] = useState<PreludeData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const chat = useInitChat();

    useEffect(() => {
        const loadPrelude = async () => {
            try {
                const data = await chat.api.widgetPrelude();
                setPrelude({
                    organizationName: data.organizationName,
                    initialQuestions: data.initialQuestions
                });
            } catch (error) {
                console.error('Failed to load prelude:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadPrelude();
    }, [chat]);

    return (
        <ChatContext.Provider value={{ ...chat, prelude, isLoading }}>
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