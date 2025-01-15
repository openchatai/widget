import {
  DefaultTextComponentBaseProps,
  WidgetLiteralComponentKey,
} from "@react/types";
import { ChatAttachmentType, WidgetHistoryDto } from "./schemas-v2";
import { SafeExtract, StringOrLiteral } from "./helpers";

export type AgentType = {
  isAi: boolean;
  id: string | null;
  name: string;
  avatar: string | null;
};

export type UserMessageType = {
  id: string;
  type: "FROM_USER";
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

export type BotMessageType<TData = DefaultTextComponentBaseProps | unknown> = {
  id: string;
  type: "FROM_BOT";
  /**
   * The type is a bot_message literal string or other strings that correspond to the UI responses from AI action calls
   */
  component: StringOrLiteral<
    SafeExtract<WidgetLiteralComponentKey, "bot_message">
  >;
  data: TData;
  timestamp: string;
  original?: WidgetHistoryDto;
  agent?: AgentType;
  attachments?: ChatAttachmentType[];
};

export type AgentMessageType = {
  id: string;
  type: "FROM_AGENT";
  component: SafeExtract<WidgetLiteralComponentKey, "agent_message">;
  data: DefaultTextComponentBaseProps;
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
