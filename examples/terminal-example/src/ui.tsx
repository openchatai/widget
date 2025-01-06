import React, { useState, useEffect } from 'react';
import { Box, Text, useInput, useApp } from 'ink';
import TextInput from 'ink-text-input';
import Spinner from 'ink-spinner';
import { createChat, createConfig, ApiCaller } from '@core/index.js';
import type { Platform, Storage } from '@platform/index.js';
import type { MessageType } from '@core/types/messages.js';
import usePubsub from './usePubsub.js';
import { readdirSync, readFileSync, unlinkSync, writeFileSync } from 'node:fs';
const configOptions = {
    token: '6cb3b1b746e45441b4d2a874dd60d44a',
    socketUrl: 'http://localhost:8080',
    apiUrl: 'http://localhost:8080/backend',
    user: {
        email: "test@test.com",
        name: "Test User"
    }
};

const storage: Storage = {
    getItem: (key: string) => {
        return readFileSync(key, 'utf8');
    },
    setItem: (key: string, value: string) => {
        writeFileSync(key, value);
    },
    removeItem: (key: string) => {
        unlinkSync(key);
    },
    clear: () => {
        readdirSync('.').forEach(file => {
            unlinkSync(file);
        });
    }
}

const platform: Platform = {
    date: {
        now: () => Date.now(),
        toISOString: (date: number) => new Date(date).toISOString()
    },
    env: {
        platform: 'node',
    },
    storage,
};

type ChatState = {
    messages: MessageType[];
    keyboard: { options: string[] } | null;
    loading: { isLoading: boolean };
    error: { hasError: boolean };
};

const defaultChatState: ChatState = {
    messages: [],
    keyboard: null,
    loading: { isLoading: false },
    error: { hasError: false }
};

function MessagesRenderer({ messages }: { messages: MessageType[] }) {
    if (messages.length === 0) return null;

    return messages.map((msg, index) => {
        if (msg.type === 'FROM_USER') {
            return (
                <Text key={index} color="green">
                    {msg.content}
                </Text>
            );
        }

        return (
            <Text key={index} color="blue">
                {JSON.stringify(msg.data)}
            </Text>
        );
    });
}

export const Chat = () => {
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [organizationName, setOrganizationName] = useState('');
    const [initialQuestions, setInitialQuestions] = useState<string[]>([]);
    const { exit } = useApp();

    // Initialize chat
    const chatInstance = React.useMemo(() => {
        const config = createConfig(configOptions);
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
        }
    }, []);

    const chatState = usePubsub<ChatState>(chatInstance.chat.chatState) ?? defaultChatState;

    // Load prelude data
    useEffect(() => {
        const loadPrelude = async () => {
            try {
                const data = await chatInstance.api.widgetPrelude();
                setOrganizationName(data.organizationName);
                setInitialQuestions(data.initialQuestions);
            } catch (error) {
                console.error('Failed to load prelude:', error);
            }
        };

        loadPrelude();
    }, [chatInstance]);

    // Handle keyboard input
    useInput((input: string, key: { escape: boolean }) => {
        if (key.escape) {
            exit();
        }
    });

    const handleSubmit = async (value: string) => {
        if (!value.trim()) return;

        setIsLoading(true);
        try {
            await chatInstance.chat.sendMessage({
                content: value,
            });
            setInput('');
        } catch (error) {
            console.error('Failed to send message:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box flexDirection="column" padding={1}>
            <Box marginBottom={1}>
                <Text bold color="blue">{organizationName || 'Chat Assistant'}</Text>
            </Box>

            {chatState.messages.length === 0 && initialQuestions.length > 0 && (
                <Box flexDirection="column" marginBottom={1}>
                    <Text bold>Suggested questions:</Text>
                    {initialQuestions.map((question, index) => (
                        <Text key={index} color="gray">• {question}</Text>
                    ))}
                </Box>
            )}

            <MessagesRenderer messages={chatState.messages} />

            <Box>
                <Text>{'> '}</Text>
                <TextInput
                    value={input}
                    onChange={setInput}
                    onSubmit={handleSubmit}
                    placeholder="Type your message..."
                />
                {isLoading && (
                    <Box marginLeft={1}>
                        <Text color="yellow">
                            <Spinner type="dots" />
                        </Text>
                    </Box>
                )}
            </Box>

            <Box marginTop={1}>
                <Text dimColor>Press ESC to exit</Text>
            </Box>
        </Box>
    );
}; 