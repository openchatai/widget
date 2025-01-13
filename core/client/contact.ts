import { PubSub } from "../types/pub-sub";
import { ApiCaller } from "./api";
import { Platform } from "../platform";
import { LoadingState, ErrorState } from "../types/helpers";
import { ConfigInstance } from "./config";

type ContactState = {
    contact: any | null;
    loading: LoadingState;
    error: ErrorState;
};

export type CreateContactOptions = {
    api: ApiCaller;
    config: ConfigInstance
};

export function createContact({ config }: CreateContactOptions, platform: Platform) {
    const state = new PubSub<ContactState>({
        contact: null,
        loading: { isLoading: false, reason: null },
        error: { hasError: false }
    });

    function shouldCollectData(): { should: boolean; reason?: string } {
        const currentState = state.getState();

        if (!currentState.contact?.id && config.getConfig().collectUserData) {
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

    return {
        contactState: state,
        shouldCollectData,
        cleanup,
    };
} 