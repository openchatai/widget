import { useState, useCallback } from 'react';
import { useChat } from '../context/ChatContext';
import { SendMessageInput } from '../../core';

export const useSendMessage = () => {
    const { chat } = useChat();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const sendMessage = useCallback(async (message: SendMessageInput) => {
        if (!chat) {
            throw new Error('Chat is not initialized');
        }

        try {
            setIsLoading(true);
            setError(null);
            await chat.sendMessage(message);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to send message'));
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [chat]);

    return {
        sendMessage,
        isLoading,
        error,
    };
}; 