import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createFetch } from '../../utils/create-fetch';

describe('createFetch', () => {
    const mockFetch = vi.fn();
    const originalFetch = global.fetch;

    beforeEach(() => {
        vi.clearAllMocks();
        global.fetch = mockFetch;
    });

    afterEach(() => {
        global.fetch = originalFetch;
    });

    describe('URL Construction', () => {
        it('should construct URL with baseURL', async () => {
            const customFetch = createFetch({ baseURL: 'https://api.example.com' });
            await customFetch('/endpoint');

            expect(mockFetch).toHaveBeenCalledWith(
                'https://api.example.com/endpoint',
                expect.any(Object)
            );
        });

        it('should handle trailing slashes in baseURL', async () => {
            const customFetch = createFetch({ baseURL: 'https://api.example.com/' });
            await customFetch('/endpoint');

            expect(mockFetch).toHaveBeenCalledWith(
                'https://api.example.com/endpoint',
                expect.any(Object)
            );
        });

        it('should handle paths without leading slash', async () => {
            const customFetch = createFetch({ baseURL: 'https://api.example.com/' });
            await customFetch('endpoint');

            expect(mockFetch).toHaveBeenCalledWith(
                'https://api.example.com/endpoint',
                expect.any(Object)
            );
        });
    });

    describe('Headers Handling', () => {
        it('should include default headers', async () => {
            const customFetch = createFetch({
                baseURL: 'https://api.example.com',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            await customFetch('/endpoint');

            expect(mockFetch).toHaveBeenCalledWith(
                expect.any(String),
                expect.objectContaining({
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            );
        });

        it('should merge request headers with default headers', async () => {
            const customFetch = createFetch({
                baseURL: 'https://api.example.com',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Default': 'default'
                }
            });

            await customFetch('/endpoint', {
                headers: {
                    'X-Custom': 'custom'
                }
            });

            expect(mockFetch).toHaveBeenCalledWith(
                expect.any(String),
                expect.objectContaining({
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Default': 'default',
                        'X-Custom': 'custom'
                    }
                })
            );
        });

        it('should allow request headers to override default headers', async () => {
            const customFetch = createFetch({
                baseURL: 'https://api.example.com',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            await customFetch('/endpoint', {
                headers: {
                    'Content-Type': 'text/plain'
                }
            });

            expect(mockFetch).toHaveBeenCalledWith(
                expect.any(String),
                expect.objectContaining({
                    headers: {
                        'Content-Type': 'text/plain'
                    }
                })
            );
        });
    });

    describe('Request Options', () => {
        it('should pass through request options', async () => {
            const customFetch = createFetch({ baseURL: 'https://api.example.com' });
            const options = {
                method: 'POST',
                body: JSON.stringify({ data: 'test' }),
                credentials: 'include' as const
            };

            await customFetch('/endpoint', options);

            expect(mockFetch).toHaveBeenCalledWith(
                expect.any(String),
                expect.objectContaining(options)
            );
        });

        it('should handle query parameters', async () => {
            const customFetch = createFetch({ baseURL: 'https://api.example.com' });
            await customFetch('/endpoint?param1=value1&param2=value2');

            expect(mockFetch).toHaveBeenCalledWith(
                'https://api.example.com/endpoint?param1=value1&param2=value2',
                expect.any(Object)
            );
        });
    });

    describe('Response Handling', () => {
        it('should return the fetch Response object', async () => {
            const mockResponse = new Response('{"data": "test"}', {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
            mockFetch.mockResolvedValue(mockResponse);

            const customFetch = createFetch({ baseURL: 'https://api.example.com' });
            const response = await customFetch('/endpoint');

            expect(response).toBe(mockResponse);
        });

        it('should propagate fetch errors', async () => {
            const error = new Error('Network error');
            mockFetch.mockRejectedValue(error);

            const customFetch = createFetch({ baseURL: 'https://api.example.com' });
            await expect(customFetch('/endpoint')).rejects.toThrow('Network error');
        });
    });
}); 