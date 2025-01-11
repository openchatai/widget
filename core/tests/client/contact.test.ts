import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createContact } from '../../client/contact';
import { Platform } from '../../platform';
import { ConsumerType } from '../../types/schemas';

describe('Contact', () => {
    const mockApi = {
        me: vi.fn()
    };

    const mockConfig = {
        collectUserData: true,
        getSettings: vi.fn().mockReturnValue({})
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

    let contact: ReturnType<typeof createContact>;

    beforeEach(() => {
        vi.clearAllMocks();
        contact = createContact({
            api: mockApi as any,
            platform: mockPlatform,
            config: mockConfig as any
        });
    });

    describe('Initial State', () => {
        it('should initialize with empty contact state', () => {
            const state = contact.contactState.getState();
            expect(state).toEqual({
                contact: null,
                loading: { isLoading: false },
                error: { hasError: false }
            });
        });
    });

    describe('loadContact', () => {
        const mockContactData: ConsumerType = {
            id: 'test-id',
            name: 'Test User',
            email: 'test@example.com',
            created_at: '2024-01-01T00:00:00Z',
            avatar_url: null
        };

        it('should load contact from storage successfully', async () => {
            mockStorage.getItem.mockResolvedValue(JSON.stringify(mockContactData));

            const result = await contact.loadContact();

            expect(result).toEqual(mockContactData);
            expect(contact.contactState.getState().contact).toEqual(mockContactData);
            expect(contact.contactState.getState().error.hasError).toBe(false);
        });

        it('should handle storage error', async () => {
            const error = new Error('Storage error');
            mockStorage.getItem.mockRejectedValue(error);

            const result = await contact.loadContact();

            expect(result).toBeNull();
            expect(contact.contactState.getState().error).toEqual({
                hasError: true,
                message: 'Storage error',
                code: 'CONTACT_LOAD_FAILED'
            });
        });

        it('should return null when storage is not available', async () => {
            const platformWithoutStorage: Platform = {
                ...mockPlatform,
                storage: undefined,
                logger: mockLogger,
                env: { platform: 'test' }
            };

            const contactWithoutStorage = createContact({
                api: mockApi as any,
                platform: platformWithoutStorage,
                config: mockConfig as any
            });

            const result = await contactWithoutStorage.loadContact();

            expect(result).toBeNull();
            expect(contactWithoutStorage.contactState.getState().contact).toBeNull();
        });
    });

    describe('saveContact', () => {
        const mockContactData: Partial<ConsumerType> = {
            id: 'test-id',
            name: 'Test User',
            email: 'test@example.com'
        };

        it('should save contact data successfully', async () => {
            const result = await contact.saveContact(mockContactData);

            expect(result).toMatchObject({
                id: 'test-id',
                name: 'Test User',
                email: 'test@example.com'
            });
            expect(mockStorage.setItem).toHaveBeenCalled();
            expect(contact.contactState.getState().contact).toMatchObject(mockContactData);
        });

        it('should merge with existing contact data', async () => {
            const existingContact: ConsumerType = {
                id: 'existing-id',
                name: 'Existing User',
                email: null,
                created_at: '2024-01-01T00:00:00Z',
                avatar_url: null
            };
            contact.contactState.setStatePartial({ contact: existingContact });

            const updateData = {
                email: 'new@example.com'
            };

            const result = await contact.saveContact(updateData);

            expect(result).toMatchObject({
                id: 'existing-id',
                name: 'Existing User',
                email: 'new@example.com'
            });
        });

        it('should handle storage error', async () => {
            const error = new Error('Storage error');
            mockStorage.setItem.mockRejectedValue(error);

            const result = await contact.saveContact(mockContactData);

            expect(result).toBeNull();
            expect(contact.contactState.getState().error).toEqual({
                hasError: true,
                message: 'Storage error',
                code: 'CONTACT_SAVE_FAILED'
            });
        });
    });

    describe('shouldCollectData', () => {
        it('should return true when no contact and collectUserData is true', () => {
            const result = contact.shouldCollectData();
            expect(result).toEqual({
                should: true,
                reason: 'No contact id and collectUserData is true'
            });
        });

        it('should return false when contact exists', async () => {
            await contact.saveContact({ id: 'test-id' });
            const result = contact.shouldCollectData();
            expect(result).toEqual({ should: false });
        });

        it('should return false when collectUserData is false', () => {
            const contactWithoutCollection = createContact({
                api: mockApi as any,
                platform: mockPlatform,
                config: { ...mockConfig, collectUserData: false } as any
            });

            const result = contactWithoutCollection.shouldCollectData();
            expect(result).toEqual({ should: false });
        });
    });

    describe('cleanup', () => {
        beforeEach(async () => {
            await contact.saveContact({
                id: 'test-id',
                name: 'Test User'
            });
        });

        it('should clear contact state and storage', async () => {
            await contact.cleanup();

            expect(contact.contactState.getState()).toEqual({
                contact: null,
                loading: { isLoading: false },
                error: { hasError: false }
            });
            expect(mockStorage.removeItem).toHaveBeenCalled();
        });

        it('should handle storage error during cleanup', async () => {
            const error = new Error('Storage error');
            mockStorage.removeItem.mockRejectedValue(error);

            await contact.cleanup();

            expect(contact.contactState.getState().error).toEqual({
                hasError: true,
                message: 'Storage error',
                code: 'CONTACT_CLEANUP_FAILED'
            });
        });
    });
}); 