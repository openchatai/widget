import type { MessageAttachmentType, MessageDto } from "./schemas";
import type { SafeExtract, StringOrLiteral } from "./helpers";
import type { AgentOrBotType } from "./agent-or-bot";

/* ------------------------------------------------------ */
/*                 Component-related types                */
/* ------------------------------------------------------ */
export type WidgetComponentKey = StringOrLiteral<
  "bot_message" | "agent_message" | "loading" | "fallback"
>;

export type DefaultWidgetTextComponentData = {
  message: string;
  variant?: "default" | "error";
};

/* ------------------------------------------------------ */
/*                      Message types                     */
/* ------------------------------------------------------ */
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

export type BotMessageType<TData = DefaultWidgetTextComponentData | unknown> = {
  id: string;
  type: "FROM_BOT";
  /**
   * The type is a bot_message literal string or other strings that correspond to the UI responses from AI action calls
   */
  component: StringOrLiteral<SafeExtract<WidgetComponentKey, "bot_message">>;
  data: TData;
  timestamp: string;
  original?: MessageDto;
  agent?: AgentOrBotType;
  attachments?: MessageAttachmentType[];
};

export type AgentMessageType = {
  id: string;
  type: "FROM_AGENT";
  component: SafeExtract<WidgetComponentKey, "agent_message">;
  data: DefaultWidgetTextComponentData;
  timestamp?: string;
  original?: MessageDto;
  agent?: AgentOrBotType;
  attachments?: MessageAttachmentType[];
};

/* ------------------------------------------------------ */
/*                          Union                         */
/* ------------------------------------------------------ */
export type MessageType = UserMessageType | BotMessageType | AgentMessageType;
