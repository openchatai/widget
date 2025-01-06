import React, { useState, useEffect } from 'react';
import { Box, Text, useInput, useApp } from 'ink';
import TextInput from 'ink-text-input';
import Spinner from 'ink-spinner';
import usePubsub from './usePubsub.js';
import { readFileSync, unlinkSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { createChat, createConfig, ApiCaller } from "../../../core/index.js"
import type { MessageType } from "../../../core/types/messages.js"
import type { Platform, Storage } from "../../../core/platform/index.js"
import { cwd } from 'node:process';
import { createLogger } from '@core/platform/logger.js';

// Create storage directory in current working directory
const STORAGE_DIR = join(cwd(), '.tui-data');
if (!existsSync(STORAGE_DIR)) {
    mkdirSync(STORAGE_DIR, { recursive: true });
}

// Function to make keys safe for file paths
function safeStorageKey(key: string): string {
    // Replace invalid characters with safe alternatives
    return Buffer.from(key).toString('base64').replace(/[/+=]/g, '_');
}

const storage: Storage = {
    getItem: (key: string) => {
        try {
            const safeKey = safeStorageKey(key);
            const filePath = join(STORAGE_DIR, `${safeKey}.json`);
            if (!existsSync(filePath)) {
                return null;
            }
            const content = readFileSync(filePath, 'utf8');
            return content;
        } catch (error) {
            console.error(`Failed to read from storage: ${error}`);
            return null;
        }
    },
    setItem: (key: string, value: string) => {
        try {
            const safeKey = safeStorageKey(key);
            const filePath = join(STORAGE_DIR, `${safeKey}.json`);

            // Ensure directory exists
            if (!existsSync(STORAGE_DIR)) {
                mkdirSync(STORAGE_DIR, { recursive: true });
            }

            writeFileSync(filePath, value, 'utf8');
        } catch (error) {
            console.error(`Failed to write to storage: ${error}`);
        }
    },
    removeItem: (key: string) => {
        try {
            const safeKey = safeStorageKey(key);
            const filePath = join(STORAGE_DIR, `${safeKey}.json`);
            if (existsSync(filePath)) {
                unlinkSync(filePath);
            }
        } catch (error) {
            console.error(`Failed to remove from storage: ${error}`);
        }
    },
    isAvailable() {
        try {
            // Ensure directory exists
            if (!existsSync(STORAGE_DIR)) {
                mkdirSync(STORAGE_DIR, { recursive: true });
            }
            const testFile = join(STORAGE_DIR, '.test');
            writeFileSync(testFile, 'test', 'utf8');
            unlinkSync(testFile);
            return true;
        } catch (error) {
            console.error(`Storage not available: ${error}`);
            return false;
        }
    },
};

const platform: Platform = {
    env: {
        platform: 'node',
    },
    storage,
    logger: createLogger({
        enabled: true,
        level: "debug",
    })
};

type ChatState = {
    messages: MessageType[];
    keyboard: { options: string[] } | null;
    loading: { isLoading: boolean };
    error: { hasError: boolean };
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
        const config = createConfig({
            token: '6cb3b1b746e45441b4d2a874dd60d44a',
            socketUrl: 'http://localhost:8080',
            apiUrl: 'http://localhost:8080/backend',
            user: {
                email: "test@test.com",
                name: "Test User"
            },
            settings: {
                persistSession: true,
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
        }
    }, []);

    const chatState = usePubsub<ChatState>(chatInstance.chat.chatState)
    const session = usePubsub(chatInstance.chat.sessionState)
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
                <Text>{session?.id}</Text>
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