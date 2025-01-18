import { ChatAttachmentType, WidgetHistoryDto } from "./schemas";
import { SafeExtract, StringOrLiteral } from "./helpers";
import { AgentOrBotType } from "./agent-or-bot";
import {
  DefaultTextComponentBaseProps,
  WidgetLiteralComponentKey,
} from "../../react-web/types";

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
  agent?: AgentOrBotType;
  attachments?: ChatAttachmentType[];
};

export type AgentMessageType = {
  id: string;
  type: "FROM_AGENT";
  component: SafeExtract<WidgetLiteralComponentKey, "agent_message">;
  data: DefaultTextComponentBaseProps;
  timestamp?: string;
  original?: WidgetHistoryDto;
  agent?: AgentOrBotType;
  attachments?: ChatAttachmentType[];
};

export type MessageType = UserMessageType | BotMessageType | AgentMessageType;
