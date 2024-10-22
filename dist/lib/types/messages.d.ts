import { WidgetOptions } from './options';
import { ChatHistoryMessageType } from './schemas';
export type UserMessageType = {
    type: "FROM_USER";
    id: string;
    content: string;
    timestamp?: string;
    session_id: string;
    serverId: string | null;
    deliveredAt: string | null;
    user?: {
        name?: string;
        email?: string;
        phone?: string;
        customData?: Record<string, string>;
        avatarUrl?: string;
    };
};
export type BotMessageType<TData = unknown> = {
    id: string;
    type: "FROM_BOT";
    component: string;
    data: TData;
    bot?: WidgetOptions["bot"];
    serverId: number | null;
    timestamp?: string;
    original?: ChatHistoryMessageType;
    agent?: {
        name?: string;
        is_ai: boolean;
        agent_avatar?: string;
    };
};
export type MessageType = UserMessageType | BotMessageType;
