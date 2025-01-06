import { createContext, useContext, useEffect, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createChat, createConfig, ApiCaller, Platform } from '@core/index';
import { createLogger } from '../../../core/platform/logger';

const socketUrl = 'http://localhost:8080';
const apiUrl = 'http://localhost:8080/backend';

export const platform: Platform = {
    env: {
        platform: 'react-native'
    },
    storage: {
        getItem: async (key: string) => {
            try {
                return await AsyncStorage.getItem(key);
            } catch (error) {
                console.error('Failed to read from storage:', error);
                return null;
            }
        },
        setItem: async (key: string, value: string) => {
            try {
                await AsyncStorage.setItem(key, value);
            } catch (error) {
                console.error('Failed to write to storage:', error);
            }
        },
        removeItem: async (key: string) => {
            try {
                await AsyncStorage.removeItem(key);
            } catch (error) {
                console.error('Failed to remove from storage:', error);
            }
        },
        isAvailable: () => {
            let isAvailable = false;
            try {
                AsyncStorage.setItem('test', 'test').then(() => {
                    AsyncStorage.removeItem('test').then(() => {
                        isAvailable = true;
                    });
                });
            } catch {
                isAvailable = false;
            }
            return isAvailable;
        }
    },
    logger: createLogger({
        level: 'debug',
        prefix: '[OpenChat RN]',
        enabled: true
    })
};

export type PreludeData = {
    organizationName: string;
    initialQuestions: string[];
};

export type ChatContextType = ReturnType<typeof useInitChat> & {
    prelude: PreludeData | null;
    isLoading: boolean;
};

const ChatContext = createContext<ChatContextType | null>(null);

export const useInitChat = () => {
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

        return {
            chat,
            api,
            config,
            platform
        };
    }, []);

    useEffect(() => {
        return () => {
            chat.chat.cleanup();
        };
    }, [chat]);

    return chat;
};

export const useChatContext = () => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error('useChatContext must be used within a ChatProvider');
    }
    return context;
};

export default ChatContext; 