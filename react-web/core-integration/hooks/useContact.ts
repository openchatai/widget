import { useChat } from '../ChatProvider';
import { usePubsub } from './usePubsub';

export function useContact() {
    const { contact: contactManager } = useChat();
    const contactState = usePubsub(contactManager.contactState);

    return {
        contactState,
        contactManager
    };
}
