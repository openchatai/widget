import React, { useState, useEffect } from 'react';
import ChatContext, { useInitChat, PreludeData } from '../hooks/useChatContext';

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