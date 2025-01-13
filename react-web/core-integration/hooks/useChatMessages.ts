import { usePubsub } from './usePubsub';
import { useChat } from '../ChatProvider';

export function useChatState() {
    const { chat } = useChat();
    const chatState = usePubsub(chat.chatState);
    return { chatState, chat }
}