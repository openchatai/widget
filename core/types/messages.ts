import type { AgentType, ChatAttachmentType, ChatHistoryMessageType } from "./schemas";

export type UserMessageType = {
    id: string;
    type: "FROM_USER";
    content: string;
    deliveredAt: string | null;
    attachments?: ChatAttachmentType[];
    timestamp?: string;
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
    timestamp?: string;
    original?: ChatHistoryMessageType;
    agent?: AgentType;
    attachments?: ChatAttachmentType[];
};

export type MessageType = UserMessageType | BotMessageType



export interface SendMessageInput {
    content: {
        text: string;
    };
    attachments?: ChatAttachmentType[];
    id?: string;
    language?: string;
    user?: {
        external_id?: string;
        name?: string;
        email?: string;
        phone?: string;
        customData?: Record<string, string>;
        avatarUrl?: string;
    };
}
