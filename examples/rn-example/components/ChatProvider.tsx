import React, { useState, useEffect, useCallback } from 'react';
import ChatContext, { useInitChat } from '../hooks/useChatContext';
import type { WidgetPreludeSchema } from '@opencx/widget';

type PreludeError = {
    hasError: boolean;
    message?: string;
};

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [prelude, setPrelude] = useState<WidgetPreludeSchema | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [preludeError, setPreludeError] = useState<PreludeError>({ hasError: false });

    const chat = useInitChat();

    const loadPrelude = useCallback(async () => {
        try {
            setIsLoading(true);
            setPreludeError({ hasError: false });
            const data = await chat.api.widgetPrelude();
            setPrelude(data);
        } catch (error) {
            console.error('Failed to load prelude:', error);
            setPreludeError({
                hasError: true,
                message: error instanceof Error ? error.message : 'Failed to load organization details'
            });
        } finally {
            setIsLoading(false);
        }
    }, [chat]);

    useEffect(() => {
        loadPrelude();
    }, [loadPrelude]);

    return (
        <ChatContext.Provider value={{ ...chat, prelude, isLoading, preludeError, retryPrelude: loadPrelude }}>
            {children}
        </ChatContext.Provider>
    );
}; 