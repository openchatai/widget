import { useChat } from '../ChatProvider';
import { usePubsub } from './usePubsub';

export function useContact() {
    const { chat } = useChat();
    const contactState = usePubsub(chat.contactState);

    return {
        contactState,
        contactManager: chat.contactManager
    };
}
