import React, { useState, useEffect } from 'react';
import ChatContext, { useInitChat } from '../hooks/useChatContext';
import { ApiCaller } from '@opencx/widget';

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [prelude, setPrelude] = useState<Awaited<ReturnType<typeof ApiCaller['prototype']['widgetPrelude']>> | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const chat = useInitChat();

    useEffect(() => {
        const loadPrelude = async () => {
            try {
                const data = await chat.api.widgetPrelude();
                setPrelude(data);
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