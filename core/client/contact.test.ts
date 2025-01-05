import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createContact } from './contact';
import { ApiCaller } from './api';
import { Platform } from '../platform';
import { ConsumerType } from '../types';

describe('createContact', () => {
    let mockApi: ApiCaller;
    let mockPlatform: Platform;
    let mockStorage: Record<string, string>;

    beforeEach(() => {
        mockStorage = {};
        const storage: Storage = {
            getItem: vi.fn((key: string) => mockStorage[key] || null),
            setItem: vi.fn((key: string, value: string) => {
                mockStorage[key] = value;
            }),
            removeItem: vi.fn((key: string) => {
                delete mockStorage[key];
            }),
            length: 0,
            clear: vi.fn(),
            key: vi.fn((index: number) => Object.keys(mockStorage)[index] || null)
        };

        mockPlatform = {
            storage,
            env: {
                platform: 'test'
            },
            date: {
                now: () => Date.now(),
                toISOString: (date: number) => new Date(date).toISOString()
            }
        };

        const mockContactResponse: ConsumerType = {
            id: 'test-contact-id',
            name: 'Test User',
            email: 'test@example.com',
            created_at: new Date().toISOString(),
            avatar_url: null
        };

        mockApi = {
            fetch: vi.fn().mockImplementation(async (url: string, options: any) => {
                if (url.includes('/contact') && options.method === 'POST') {
                    return { json: () => Promise.resolve(mockContactResponse) };
                }
                return { json: () => Promise.resolve({}) };
            })
        } as unknown as ApiCaller;
    });

    it('should create a contact instance with initial state', () => {
        const contact = createContact({
            api: mockApi,
            botToken: 'test-token',
            platform: mockPlatform
        });

        expect(contact.getContact()).toBeNull();
        expect(contact.shouldCollectData()).toEqual({ should: false });
    });

    it('should indicate data collection needed when configured', () => {
        const contact = createContact({
            api: mockApi,
            botToken: 'test-token',
            platform: mockPlatform,
            collectUserData: true
        });

        expect(contact.shouldCollectData()).toEqual({
            should: true,
            reason: "No contact id and collectUserData is true"
        });
    });

    it('should persist contact data to storage', async () => {
        const user = {
            email: 'test@example.com',
            name: 'Test User'
        };

        const contact = createContact({
            api: mockApi,
            botToken: 'test-token',
            platform: mockPlatform,
            user
        });

        // Wait for initial contact creation
        await new Promise(resolve => setTimeout(resolve, 0));

        expect(mockPlatform.storage!.setItem).toHaveBeenCalled();

        const storedData = mockStorage[`test-token:contact:undefined`];
        expect(JSON.parse(storedData)).toMatchObject({
            id: 'test-contact-id',
            name: 'Test User',
            email: 'test@example.com'
        });
    });

    it('should load persisted contact data', () => {
        const persistedContact = {
            id: 'persisted-id',
            name: 'Persisted User',
            email: 'persisted@example.com',
            created_at: new Date().toISOString(),
            avatar_url: null
        };

        mockStorage['test-token:contact:user-1'] = JSON.stringify(persistedContact);

        const contact = createContact({
            api: mockApi,
            botToken: 'test-token',
            platform: mockPlatform,
            user: {
                external_id: 'user-1'
            }
        });

        expect(contact.getContact()).toEqual(persistedContact);
    });

    it('should cleanup resources', () => {
        const contact = createContact({
            api: mockApi,
            botToken: 'test-token',
            platform: mockPlatform
        });

        const unsubscribe = vi.fn();
        contact.subscribe(() => unsubscribe());

        contact.cleanup();

        // State should be cleared
        expect(contact.getContact()).toBeNull();
    });
}); 