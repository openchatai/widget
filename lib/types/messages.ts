import { AgentType, ChatAttachmentType, ChatHistoryMessageType } from "./schemas";


export type UserMessageType = {
  type: "FROM_USER";
  id: string;
  content: string;
  serverId: string | null;
  deliveredAt: string | null;
  attachments?: ChatAttachmentType[];
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
  serverId: number | null;
  timestamp?: string;
  original?: ChatHistoryMessageType;
  agent?: AgentType;
  attachments?: ChatAttachmentType[];
};

export type MessageType = UserMessageType | BotMessageType
