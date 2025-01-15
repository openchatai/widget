import { PubSub } from "../types/pub-sub";
import { ApiCaller } from "./api";
import { Platform } from "../platform";
import { LoadingState, ErrorState } from "../types/helpers";
import { ConfigInstance } from "./config";
import { Contact } from "../types/contact";
import { Dto } from "@core/sdk";

type ContactState = {
    contact: Contact | null;
    loading: LoadingState;
    error: ErrorState;
};

export type CreateContactOptions = {
    api: ApiCaller;
    config: ConfigInstance;
};


export function createContactHandler({ config, api }: CreateContactOptions, platform: Platform) {
    const state = new PubSub<ContactState>({
        contact: null,
        loading: { isLoading: false, reason: null },
        error: { hasError: false }
    });

    function shouldCollectData() {
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

    async function cleanup() {
        try {
            state.setStatePartial({
                loading: { isLoading: true, reason: 'cleaning_up' },
                error: { hasError: false }
            });
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

    async function createUnauthenticatedContact(payload: Dto['CreateContactDto']): Promise<Dto['WidgetContactDto'] | null> {
        state.setStatePartial({
            loading: { isLoading: true, reason: 'creating_unauthenticated_contact' },
            error: { hasError: false }
        });

        const { data, error } = await api.createContact(payload);
        if (data?.contactId) {
            state.setStatePartial({
                contact: {
                    authenticationStatus: {
                        is: false
                    },
                    contactId: data.contactId,
                    contactName: data.contactName
                }
            });
            return data
        }

        if (error) {
            state.setStatePartial({
                loading: { isLoading: false, reason: null },
                error: { hasError: true, message: error?.message, code: 'CONTACT_CREATION_FAILED' }
            });
        }

        return null;
    }

    return {
        contactState: state,
        shouldCollectData,
        cleanup,
        createUnauthenticatedContact
    };
} 