import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ApiCaller } from '../../client/api';
import { createFetch } from '../../utils/create-fetch';

vi.mock('../../utils/create-fetch', () => ({
    createFetch: vi.fn()
}));

describe('ApiCaller', () => {
    let apiCaller: ApiCaller;
    const mockFetch = vi.fn();
    const mockConfig = {
        token: 'test-token',
        apiUrl: 'https://api.test.com',
        user: {
            email: 'test@example.com'
        }
    };

    beforeEach(() => {
        vi.clearAllMocks();
        (createFetch as any).mockReturnValue(mockFetch);
        apiCaller = new ApiCaller({ config: mockConfig as any });
    });

    describe('constructor', () => {
        it('should initialize with email-based consumer header', () => {
            expect(createFetch).toHaveBeenCalledWith({
                baseURL: 'https://api.test.com/widget/v2',
                headers: {
                    'X-Bot-Token': 'test-token',
                    'X-Consumer-Id': 'email:test@example.com',
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
        });

        it('should initialize with phone-based consumer header', () => {
            const phoneConfig = {
                ...mockConfig,
                user: { phone: '+1234567890' }
            };
            new ApiCaller({ config: phoneConfig as any });

            expect(createFetch).toHaveBeenCalledWith({
                baseURL: 'https://api.test.com/widget/v2',
                headers: {
                    'X-Bot-Token': 'test-token',
                    'X-Consumer-Id': 'phone:+1234567890',
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
        });

        it('should include Authorization header when contactToken is present', () => {
            const configWithToken = {
                ...mockConfig,
                contactToken: 'contact-token'
            };
            new ApiCaller({ config: configWithToken as any });

            expect(createFetch).toHaveBeenCalledWith({
                baseURL: 'https://api.test.com/widget/v2',
                headers: {
                    'X-Bot-Token': 'test-token',
                    'X-Consumer-Id': 'email:test@example.com',
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer contact-token'
                }
            });
        });
    });

    describe('API Methods', () => {
        beforeEach(() => {
            mockFetch.mockImplementation(() => Promise.resolve({
                json: () => Promise.resolve({})
            }));
        });

        describe('me()', () => {
            it('should make GET request to /me endpoint', async () => {
                await apiCaller.me();
                expect(mockFetch).toHaveBeenCalledWith('/me');
            });
        });

        describe('widgetPrelude()', () => {
            it('should make GET request to /prelude endpoint', async () => {
                await apiCaller.widgetPrelude();
                expect(mockFetch).toHaveBeenCalledWith('/prelude');
            });
        });

        describe('handleMessage()', () => {
            it('should make POST request to /chat/send with message data', async () => {
                const message = {
                    uuid: 'test-uuid',
                    content: 'test message',
                    session_id: 'test-session'
                };
                await apiCaller.handleMessage(message as any);

                expect(mockFetch).toHaveBeenCalledWith('/chat/send', {
                    method: 'POST',
                    body: JSON.stringify(message)
                });
            });
        });

        describe('getSessionHistory()', () => {
            it('should make GET request with sessionId and no timestamp', async () => {
                await apiCaller.getSessionHistory('test-session');
                expect(mockFetch).toHaveBeenCalledWith(
                    '/session/history/test-session?lastMessageTimestamp=',
                    { method: 'GET' }
                );
            });

            it('should include lastMessageTimestamp when provided', async () => {
                const timestamp = '2024-01-01T00:00:00Z';
                await apiCaller.getSessionHistory('test-session', timestamp);
                expect(mockFetch).toHaveBeenCalledWith(
                    `/session/history/test-session?lastMessageTimestamp=${timestamp}`,
                    { method: 'GET' }
                );
            });
        });

        describe('createSession()', () => {
            it('should make POST request to /create-session', async () => {
                await apiCaller.createSession();
                expect(mockFetch).toHaveBeenCalledWith('/create-session', {
                    method: 'POST'
                });
            });
        });

        describe('getSession()', () => {
            it('should make GET request to /session/:sessionId', async () => {
                await apiCaller.getSession('test-session');
                expect(mockFetch).toHaveBeenCalledWith('/session/test-session', {
                    method: 'GET'
                });
            });
        });

        describe('Error handling', () => {
            it('should propagate fetch errors', async () => {
                const error = new Error('Network error');
                mockFetch.mockRejectedValueOnce(error);

                await expect(apiCaller.me()).rejects.toThrow('Network error');
            });

            it('should propagate JSON parsing errors', async () => {
                mockFetch.mockResolvedValueOnce({
                    json: () => Promise.reject(new Error('Invalid JSON'))
                });

                await expect(apiCaller.me()).rejects.toThrow('Invalid JSON');
            });
        });
    });
}); 