import { PubSub } from "../types/pub-sub";
import { ConsumerType } from "../types";
import { ApiCaller } from "./api";
import { Platform } from "../platform";

type ContactOptions = {
    api: ApiCaller;
    botToken: string;
    platform: Platform;
    collectUserData?: boolean;
    user?: {
        external_id?: string;
        name?: string;
        email?: string;
        phone?: string;
        customData?: Record<string, string>;
        avatarUrl?: string;
    };
};

export function createContact(options: ContactOptions) {
    const storageKey = `${options.botToken}:contact:${options.user?.external_id}`;

    // Initialize state from storage if available
    let initialState: ConsumerType | null = null;
    if (options.platform.storage) {
        const stored = options.platform.storage.getItem(storageKey);
        if (stored) {
            try {
                initialState = JSON.parse(stored);
            } catch (e) {
                console.error("Error parsing stored contact:", e);
            }
        }
    }

    const state = new PubSub<ConsumerType | null>(initialState);

    // Subscribe to state changes to persist
    if (options.platform.storage) {
        state.subscribe((contact) => {
            if (contact) {
                options.platform.storage?.setItem(storageKey, JSON.stringify(contact));
            } else {
                options.platform.storage?.removeItem(storageKey);
            }
        });
    }

    function shouldCollectData(): { should: boolean; reason?: string } {
        const contact = state.getState();

        if (!contact?.id && options.collectUserData) {
            return {
                should: true,
                reason: "No contact id and collectUserData is true"
            };
        }

        return {
            should: false
        };
    }

    function cleanup() {
        state.clear();
        state.setState(null);
    }

    return {
        shouldCollectData,
        cleanup,
        contactState: state,
    };
} 