import { PubSub } from "../types/pub-sub";
import { ApiCaller } from "./api";
import { Platform } from "../platform";
import { LoadingState, ErrorState } from "../types/helpers";
import { ConfigInstance } from "./config";
import { Contact, ContactData, ContactStorageData } from "../types/contact";


type ContactState = {
    contact: Contact | null;
    loading: LoadingState;
    error: ErrorState;
};

export type CreateContactOptions = {
    api: ApiCaller;
    config: ConfigInstance;
};





export function createContact({ config }: CreateContactOptions, platform: Platform) {
    const state = new PubSub<ContactState>({
        contact: null,
        loading: { isLoading: false, reason: null },
        error: { hasError: false }
    });

    const { token, user } = config.getConfig();
    const STORAGE_KEY = `${token}:contact:${user.external_id ?? ""}`;

    async function setStoredContact(platform: Platform, data: ContactStorageData): Promise<void> {
        if (!platform.storage) {
            throw new Error('Storage not available');
        }
        try {
            await platform.storage.setItem(STORAGE_KEY, JSON.stringify(data));
        } catch (error) {
            console.error('Failed to save contact data:', error);
            throw new Error('Failed to save contact data');
        }
    }

    async function removeStoredContact(platform: Platform): Promise<void> {
        if (!platform.storage) {
            throw new Error('Storage not available');
        }
        try {
            await platform.storage.removeItem(STORAGE_KEY);
        } catch (error) {
            console.error('Failed to remove contact data:', error);
            throw new Error('Failed to remove contact data');
        }
    }
    async function getStoredContact(platform: Platform): Promise<ContactStorageData | null> {
        try {
            if (!platform.storage) return null;
            const data = await platform.storage.getItem(STORAGE_KEY);
            return data ? JSON.parse(data) : null;
        } catch {
            return null;
        }
    }
    async function loadStoredContact() {
        try {
            const storedContact = await getStoredContact(platform);
            if (storedContact) {
                state.setStatePartial({
                    contact: {
                        authenticationStatus: {
                            is: storedContact.isAuthenticated as false
                        },
                        contactId: storedContact.id,
                        contactName: storedContact.name
                    }
                });
            }
        } catch (error) {
            console.error('Failed to load stored contact:', error);
        }
    }

    function shouldCollectData(): { should: boolean; reason?: string } {
        const currentState = state.getState();

        if (!currentState.contact?.contactId && config.getConfig().collectUserData) {
            return {
                should: true,
                reason: "No contact id and collectUserData is true"
            };
        }

        return {
            should: false
        };
    }

    async function cleanup(removeContact: boolean = false) {
        try {
            state.setStatePartial({
                loading: { isLoading: true, reason: 'cleaning_up' },
                error: { hasError: false }
            });
            if (removeContact) {
                await removeStoredContact(platform);
            }

            state.setState({
                contact: null,
                loading: { isLoading: false, reason: null },
                error: { hasError: false }
            });

            state.clear();
        } catch (error) {
            state.setStatePartial({
                error: {
                    hasError: true,
                    message: error instanceof Error ? error.message : 'Failed to cleanup contact data',
                    code: 'CONTACT_CLEANUP_FAILED'
                }
            });
        } finally {
            state.setStatePartial({
                loading: { isLoading: false, reason: null }
            });
        }
    }

    loadStoredContact();

    return {
        contactState: state,
        shouldCollectData,
        cleanup,
    };
} 