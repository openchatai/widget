import type { MessageAttachmentType, MessageDto } from "./schemas";
import type { SafeExtract, StringOrLiteral } from "./helpers";
import type { AgentOrBotType } from "./agent-or-bot";

// TODO do not rely on types from the src/headless/react package
import type { DefaultTextComponentBaseProps, WidgetLiteralComponentKey } from "../../react/types/components";

export type UserMessageType = {
  id: string;
  type: "FROM_USER";
  content: string;
  deliveredAt: string | null;
  attachments?: MessageAttachmentType[] | null;
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
  original?: MessageDto;
  agent?: AgentOrBotType;
  attachments?: MessageAttachmentType[];
};

export type AgentMessageType = {
  id: string;
  type: "FROM_AGENT";
  component: SafeExtract<WidgetLiteralComponentKey, "agent_message">;
  data: DefaultTextComponentBaseProps;
  timestamp?: string;
  original?: MessageDto;
  agent?: AgentOrBotType;
  attachments?: MessageAttachmentType[];
};

/** Find a better name for this thing */
export type MessageType = UserMessageType | BotMessageType | AgentMessageType;
