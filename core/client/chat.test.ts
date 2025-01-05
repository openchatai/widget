import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createChat } from './chat';
import { ApiCaller } from './api';
import { WidgetHistorySchema, WidgetSessionSchema } from '../types/schemas-v2';
import { MessageTypeEnum } from '@core/types';

vi.mock('node-fetch', () => {
    return {
        default: vi.fn()
    }
});

describe('createChat', () => {
    let mockApi: ApiCaller;
    let mockSession: WidgetSessionSchema;
    let mockHistory: WidgetHistorySchema[];

    beforeEach(() => {
        mockSession = {
            id: 'test-session-id',
            createdAt: new Date(),
            updatedAt: new Date(),
            isHandedOff: false,
            isOpened: true,
            assignee: {
                kind: 'ai',
                name: 'AI Bot'
            },
            channel: 'web'
        };

        mockHistory = [
            {
                publicId: 'msg-1',
                type: MessageTypeEnum.MESSAGE,
                content: { text: 'Hello' },
                sender: { kind: 'user' },
                sentAt: new Date()
            },
            {
                publicId: 'msg-2',
                type: MessageTypeEnum.MESSAGE,
                content: { text: 'Hi there!' },
                sender: { kind: 'ai' },
                sentAt: new Date()
            }
        ];

        mockApi = {
            createSession: vi.fn().mockResolvedValue(mockSession),
            getSession: vi.fn().mockResolvedValue(mockSession),
            getSessionHistory: vi.fn().mockResolvedValue(mockHistory),
            handleMessage: vi.fn().mockResolvedValue({ success: true }),
            closeSession: vi.fn().mockResolvedValue(undefined),
            fetch: vi.fn().mockImplementation(async (url: string, options: any) => {
                if (url.includes('/sessions') && options.method === 'POST') {
                    return { json: () => Promise.resolve(mockSession) };
                }
                if (url.includes('/sessions/') && options.method === 'GET') {
                    return { json: () => Promise.resolve(mockSession) };
                }
                if (url.includes('/history') && options.method === 'GET') {
                    return { json: () => Promise.resolve(mockHistory) };
                }
                if (url.includes('/message') && options.method === 'POST') {
                    return { json: () => Promise.resolve({ success: true }) };
                }
                return { json: () => Promise.resolve({}) };
            })
        } as unknown as ApiCaller;
    });

    it('should create a chat instance with initial state', () => {
        const chat = createChat({ api: mockApi });
        expect(chat.getState()).toEqual({
            lastUpdated: null,
            messages: [],
            keyboard: null
        });
        expect(chat.getSession()).toBeNull();
    });

    it('should create a session', async () => {
        const chat = createChat({ api: mockApi });
        const session = await chat.createSession();

        expect(mockApi.createSession).toHaveBeenCalled();
        expect(session).toEqual(mockSession);
        expect(chat.getSession()).toEqual(mockSession);
    });

    it('should send a message', async () => {
        const chat = createChat({ api: mockApi });
        await chat.createSession();

        const message = {
            content: { text: 'Hello' },
            id: 'test-id'
        };

        await chat.sendMessage(message);

        expect(mockApi.handleMessage).toHaveBeenCalledWith({
            content: { text: 'Hello' },
            id: 'test-id',
            attachments: undefined,
            language: undefined,
            user: undefined,
            session_id: 'test-session-id'
        });

        const state = chat.getState();
        expect(state.messages).toHaveLength(1);
        expect(state.messages[0]).toMatchObject({
            id: 'test-id',
            type: 'FROM_USER',
            content: 'Hello'
        });
    });

    it('should poll for messages', async () => {
        vi.useFakeTimers();
        const chat = createChat({ api: mockApi });
        await chat.createSession();

        // Fast-forward past the polling interval
        await vi.advanceTimersByTimeAsync(5000);

        expect(mockApi.getSessionHistory).toHaveBeenCalledWith('test-session-id');
        const state = chat.getState();
        expect(state.messages).toHaveLength(2);
        expect(state.messages[0]).toMatchObject({
            id: 'msg-1',
            type: 'FROM_USER',
            content: 'Hello'
        });
        expect(state.messages[1]).toMatchObject({
            id: 'msg-2',
            type: 'FROM_BOT',
            content: undefined,
            data: { text: 'Hi there!' }
        });

        vi.useRealTimers();
    });

    it('should clear session', async () => {
        const chat = createChat({ api: mockApi });
        await chat.createSession();
        await chat.sendMessage({ content: { text: 'Hello' } });

        expect(chat.getState().messages).toHaveLength(1);
        expect(chat.getSession()).not.toBeNull();

        await chat.clearSession();

        expect(chat.getState()).toEqual({
            lastUpdated: null,
            messages: [],
            keyboard: null
        });
        expect(chat.getSession()).toBeNull();
    });

    it('should cleanup resources', async () => {
        vi.useFakeTimers();
        const chat = createChat({ api: mockApi });
        await chat.createSession();

        // Create some state
        await chat.sendMessage({ content: { text: 'Hello' } });
        await vi.advanceTimersByTimeAsync(5000);

        chat.cleanup();

        // Fast-forward past the polling interval
        await vi.advanceTimersByTimeAsync(5000);

        // Should not have polled after cleanup
        expect(mockApi.getSessionHistory).toHaveBeenCalledTimes(1);
        expect(chat.getState()).toEqual({
            lastUpdated: null,
            messages: [],
            keyboard: null
        });

        vi.useRealTimers();
    });
}); 