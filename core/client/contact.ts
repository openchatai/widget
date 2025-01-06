import { PubSub } from "../types/pub-sub";
import { ConsumerType } from "../types";
import { ApiCaller } from "./api";
import { Platform, Storage, isStorageAvailable, safeStorageOperation } from "../platform";
import { LoadingState, ErrorState } from "../types/helpers";
import { ConfigInstance } from "./config";

type ContactState = {
    contact: ConsumerType | null;
    loading: LoadingState;
    error: ErrorState;
};

type ContactOptions = {
    api: ApiCaller;
    platform: Platform;
    config: ConfigInstance
};

export function createContact(options: ContactOptions) {
    const config = options.config.getConfig();
    options.config.getConfig
    const storageKey = `${config.token}:contact:${config.user.external_id}`;
    const storage = isStorageAvailable(options.platform.storage) ? options.platform.storage : undefined;

    // Initialize state from storage if available
    let initialContact: ConsumerType | null = null;
    if (storage) {
        const result = safeStorageOperation(
            () => {
                const stored = storage.getItem(storageKey);
                return stored ? JSON.parse(stored) : null;
            },
            "Error loading contact from storage"
        );

        if (result.success) {
            initialContact = result.result;
        }
        // If loading fails, we start with null contact - no need to handle error here
    }

    const state = new PubSub<ContactState>({
        contact: initialContact,
        loading: { isLoading: false },
        error: { hasError: false }
    });

    // Subscribe to state changes to persist
    if (isStorageAvailable(storage)) {
        state.subscribe((currentState) => {
            const result = safeStorageOperation(
                () => {
                    if (currentState.contact) {
                        storage.setItem(storageKey, JSON.stringify(currentState.contact));
                    } else {
                        storage.removeItem(storageKey);
                    }
                },
                "Error persisting contact state"
            );

            if (!result.success) {
                state.setStatePartial({
                    error: {
                        hasError: true,
                        message: result.error.message,
                        code: 'CONTACT_PERSISTENCE_FAILED'
                    }
                });
            }
        });
    }

    async function loadContact() {
        try {
            state.setStatePartial({
                loading: { isLoading: true, reason: 'loading_contact' },
                error: { hasError: false }
            });

            if (storage) {
                const result = safeStorageOperation(
                    () => {
                        const stored = storage.getItem(storageKey);
                        return stored ? JSON.parse(stored) : null;
                    },
                    "Error loading contact"
                );

                if (!result.success) {
                    throw result.error;
                }

                state.setStatePartial({
                    contact: result.result,
                    error: { hasError: false }
                });

                return result.result;
            }

            return state.getState().contact;
        } catch (error) {
            state.setStatePartial({
                error: {
                    hasError: true,
                    message: error instanceof Error ? error.message : 'Failed to load contact',
                    code: 'CONTACT_LOAD_FAILED'
                }
            });
            return null;
        } finally {
            state.setStatePartial({
                loading: { isLoading: false, reason: null }
            });
        }
    }

    async function saveContact(contactData: Partial<ConsumerType>) {
        try {
            state.setStatePartial({
                loading: { isLoading: true, reason: 'saving_contact' },
                error: { hasError: false }
            });

            const currentContact = state.getState().contact;
            const updatedContact: ConsumerType = {
                id: contactData.id || currentContact?.id || '',
                name: contactData.name ?? currentContact?.name ?? null,
                created_at: contactData.created_at || currentContact?.created_at || new Date().toISOString(),
                avatar_url: contactData.avatar_url ?? currentContact?.avatar_url ?? null,
                email: contactData.email ?? currentContact?.email ?? null
            };

            if (isStorageAvailable(storage)) {
                const result = safeStorageOperation(
                    () => storage.setItem(storageKey, JSON.stringify(updatedContact)),
                    "Error saving contact"
                );

                if (!result.success) {
                    throw result.error;
                }
            }

            state.setStatePartial({
                contact: updatedContact,
                error: { hasError: false }
            });

            return updatedContact;
        } catch (error) {
            state.setStatePartial({
                error: {
                    hasError: true,
                    message: error instanceof Error ? error.message : 'Failed to save contact',
                    code: 'CONTACT_SAVE_FAILED'
                }
            });
            return null;
        } finally {
            state.setStatePartial({
                loading: { isLoading: false, reason: null }
            });
        }
    }

    function shouldCollectData(): { should: boolean; reason?: string } {
        const currentState = state.getState();

        if (!currentState.contact?.id && config.collectUserData) {
            return {
                should: true,
                reason: "No contact id and collectUserData is true"
            };
        }

        return {
            should: false
        };
    }

    async function cleanup() {
        try {
            state.setStatePartial({
                loading: { isLoading: true, reason: 'cleaning_up' },
                error: { hasError: false }
            });

            if (storage) {
                const result = safeStorageOperation(
                    () => storage.removeItem(storageKey),
                    "Error removing contact data"
                );

                if (!result.success) {
                    throw result.error;
                }
            }

            state.setState({
                contact: null,
                loading: { isLoading: false },
                error: { hasError: false }
            });

            state.clear();
        } catch (error) {
            console.error("Error cleaning up contact:", error);
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

    return {
        contactState: state,
        shouldCollectData,
        loadContact,
        saveContact,
        cleanup,
    };
} 