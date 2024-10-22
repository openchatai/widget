import { MessageType } from '../types';
import { ChatHistoryMessageType } from '../types/schemas';
declare function historyToWidgetMessages(mgs: ChatHistoryMessageType[]): MessageType[];
export { historyToWidgetMessages };
