import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createChat } from '../../client/chat';
import { Platform } from '../../platform';
import { MessageType } from '../../types';

describe('Chat', () => {
    const mockApi = {
        createSession: vi.fn(),
        getSession: vi.fn(),
        handleMessage: vi.fn(),
        getSessionHistory: vi.fn()
    };

    const mockConfig = {
        getConfig: vi.fn().mockReturnValue({
            token: 'test-token',
            user: { email: 'test@example.com' },
            headers: {},
            queryParams: {}
        }),
        getSettings: vi.fn().mockReturnValue({
            persistSession: false
        })
    };

    const mockStorage = {
        getItem: vi.fn(),
        setItem: vi.fn(),
        removeItem: vi.fn()
    };

    const mockLogger = {
        debug: vi.fn(),
        info: vi.fn(),
        warn: vi.fn(),
        error: vi.fn(),
        setLevel: vi.fn()
    };

    const mockPlatform: Platform = {
        storage: mockStorage,
        logger: mockLogger,
        env: {
            platform: 'test'
        }
    };

    let chat: ReturnType<typeof createChat>;

    beforeEach(() => {
        vi.clearAllMocks();
        chat = createChat({
            api: mockApi as any,
            config: mockConfig as any,
            platform: mockPlatform
        });
    });

    describe('Initial State', () => {
        it('should initialize with empty state', () => {
            const state = chat.chatState.getState();
            expect(state).toEqual({
                messages: [],
                keyboard: null,
                loading: { isLoading: false },
                error: { hasError: false }
            });
        });

        it('should initialize with null session state', () => {
            const session = chat.sessionState.getState();
            expect(session).toBeNull();
        });
    });

    describe('sendMessage', () => {
        const mockSession = {
            id: 'test-session',
            assignee: { kind: 'ai' }
        };

        const mockMessage = {
            content: 'Hello',
            uuid: 'test-uuid'
        };

        beforeEach(() => {
            mockApi.createSession.mockResolvedValue(mockSession);
            mockApi.getSession.mockResolvedValue(mockSession);
            mockApi.handleMessage.mockResolvedValue({ success: true });
        });

        it('should create new session if none exists', async () => {
            await chat.sendMessage(mockMessage);

            expect(mockApi.createSession).toHaveBeenCalled();
            expect(mockLogger.debug).toHaveBeenCalledWith('No active session, creating new session');
        });

        it('should use existing session if available', async () => {
            chat.sessionState.setState(mockSession as any);
            await chat.sendMessage(mockMessage);

            expect(mockApi.createSession).not.toHaveBeenCalled();
        });

        it('should add user message to state', async () => {
            chat.sessionState.setState(mockSession as any);
            await chat.sendMessage(mockMessage);

            const state = chat.chatState.getState();
            expect(state.messages[0]).toMatchObject({
                type: 'FROM_USER',
                content: mockMessage.content
            });
        });

        it('should handle successful bot response', async () => {
            const botResponse = {
                success: true,
                autopilotResponse: {
                    id: 'resp-1',
                    value: { content: 'Bot reply' }
                }
            };
            mockApi.handleMessage.mockResolvedValue(botResponse);

            chat.sessionState.setState(mockSession as any);
            await chat.sendMessage(mockMessage);

            const state = chat.chatState.getState();
            expect(state.messages).toHaveLength(2);
            expect(state.messages[1]).toMatchObject({
                type: 'FROM_BOT',
                component: 'TEXT',
                data: { message: 'Bot reply' }
            });
        });

        it('should handle error response', async () => {
            const errorResponse = {
                success: false,
                error: { message: 'Error occurred' }
            };
            mockApi.handleMessage.mockResolvedValue(errorResponse);

            chat.sessionState.setState(mockSession as any);
            await chat.sendMessage(mockMessage);

            const state = chat.chatState.getState();
            expect(state.messages[1]).toMatchObject({
                type: 'FROM_BOT',
                component: 'TEXT',
                data: {
                    message: 'Error occurred',
                    variant: 'error'
                }
            });
        });

        it('should handle network errors', async () => {
            const error = new Error('Network error');
            mockApi.handleMessage.mockRejectedValue(error);

            chat.sessionState.setState(mockSession as any);
            const result = await chat.sendMessage(mockMessage);

            expect(result).toBe(false);
            const state = chat.chatState.getState();
            expect(state.error).toEqual({
                hasError: true,
                message: 'Network error',
                code: 'MESSAGE_SEND_FAILED'
            });
        });
    });

    describe('Session Management', () => {
        const mockSession = {
            id: 'test-session',
            assignee: { kind: 'ai' }
        };

        describe('createSession', () => {
            it('should create new session successfully', async () => {
                mockApi.createSession.mockResolvedValue(mockSession);

                const session = await chat.createSession();

                expect(session).toEqual(mockSession);
                expect(chat.sessionState.getState()).toEqual(mockSession);
            });

            it('should handle session creation error', async () => {
                const error = new Error('Failed to create session');
                mockApi.createSession.mockRejectedValue(error);

                const session = await chat.createSession();

                expect(session).toBeNull();
                const state = chat.chatState.getState();
                expect(state.error).toEqual({
                    hasError: true,
                    message: 'Failed to create session',
                    code: 'SESSION_CREATION_FAILED'
                });
            });
        });

        describe('clearSession', () => {
            beforeEach(() => {
                chat.sessionState.setState(mockSession as any);
            });

            it('should clear session state', async () => {
                await chat.clearSession();

                expect(chat.sessionState.getState()).toBeNull();
                const chatState = chat.chatState.getState();
                expect(chatState.messages).toEqual([]);
                expect(chatState.keyboard).toBeNull();
            });

            it('should remove session from storage if persistence enabled', async () => {
                mockConfig.getSettings.mockReturnValue({ persistSession: true });

                await chat.clearSession();

                expect(mockStorage.removeItem).toHaveBeenCalled();
            });
        });

        describe('cleanup', () => {
            beforeEach(() => {
                chat.sessionState.setState(mockSession as any);
                const mockMessage: MessageType = {
                    id: '1',
                    type: 'FROM_USER',
                    content: 'test',
                    deliveredAt: new Date().toISOString(),
                    timestamp: new Date().toISOString()
                };
                chat.chatState.setStatePartial({
                    messages: [mockMessage]
                });
            });

            it('should reset all states', () => {
                chat.cleanup();

                expect(chat.sessionState.getState()).toBeNull();
                const chatState = chat.chatState.getState();
                expect(chatState.messages).toEqual([]);
                expect(chatState.keyboard).toBeNull();
                expect(chatState.loading.isLoading).toBe(false);
                expect(chatState.error.hasError).toBe(false);
            });

            it('should remove session from storage when removeSession is true', () => {
                mockConfig.getSettings.mockReturnValue({ persistSession: true });

                chat.cleanup(true);

                expect(mockStorage.removeItem).toHaveBeenCalled();
            });
        });
    });
}); 