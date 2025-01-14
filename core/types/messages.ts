import { ChatAttachmentType, WidgetHistoryDto } from './schemas-v2';

export type AgentType = {
  isAi: boolean;
  id: string | null;
  name: string;
  avatar: string | null;
};

export type UserMessageType = {
  id: string;
  type: 'FROM_USER';
  content: string;
  deliveredAt: string | null;
  attachments?: ChatAttachmentType[] | null;
  timestamp: string;
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
  type: 'FROM_BOT';
  component: string;
  data: TData;
  timestamp: string;
  original?: WidgetHistoryDto;
  agent?: AgentType;
  attachments?: ChatAttachmentType[];
};

export type AgentMessageType<TData = unknown> = {
  id: string;
  type: 'FROM_AGENT';
  component: string;
  data: TData;
  timestamp?: string;
  original?: WidgetHistoryDto;
  agent?: AgentType;
  attachments?: ChatAttachmentType[];
};

export type MessageType = UserMessageType | BotMessageType | AgentMessageType;

// shouldn't be used in @core
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
