import { ChatSession, HandoffPayloadType } from "@lib/types";

export function isUiElement(value: unknown): value is UiElement {
  return typeof value === "object" && value !== null;
}

interface VotePayload {
  type: "vote";
  client_message_id: string;
  server_message_id: number;
  server_session_id: string;
}

interface MessagePayload {
  agent: { name: string; is_ai: boolean };
  client_message_id: string; // the user messageId
  server_session_id: string;
  server_message_id?: number;
  type: "message";
  value: string;
}

interface InfoPayload {
  client_message_id: string;
  server_session_id: string;
  type: "info";
  value: string;
}

interface AgentType {
  name: string;
  is_ai: boolean;
  profile_picture?: string | null;
}

export interface UiElement {
  type: "form" | "ui_component";
  request_response: unknown;
  name: string;
  message_id?: string;
  content?: string;
  incoming_message_id?: string;
}

interface UiPayload {
  type: "ui";
  client_message_id: string;
  server_session_id: string;
  value: UiElement;
  agent?: AgentType;
}

export enum MessageTypeEnum {
  MESSAGE = 'message',
  HANDOFF = 'handoff',
  HANDOFF_TO_ZENDESK = 'handoff_to_zendesk',
  AGENT_MESSAGE = 'agent_message',
  AGENT_JOINED = 'agent_joined',
  AGENT_COMMENT = 'agent_comment',
  AGENT_TOOK_SESSION_FROM_AI = 'agent_took_session_from_ai',
  AI_DECIDED_TO_RESOLVE_THE_ISSUE = 'ai_decided_to_resolve_the_issue',
  AI_DECIDED_AUTO_HANDOFF_THE_ISSUE = 'ai_decided_auto_handoff_the_issue',
}
export type MessageEnumType = `${MessageTypeEnum}`;

export interface ChatEventPayload {
  type: "chat_event";
  value: {
    event: MessageEnumType;
    message: string;
  };
  agent: {
    name: string;
    is_ai: boolean;
  }
}

export interface SessionUpdatePayload {
  type: "session_update";
  server_session_id: string,
  agent: {
    name: string;
    is_ai: boolean;
  }
  value: {
    session: ChatSession;
  };
}

export interface OptionsPayload {
  type: "options";
  value: {
    options: string[];
  },
  server_session_id?: string,
  agent: {
    name: string,
    is_ai: boolean,
  },
}

export type SocketMessageParams =
  | InfoPayload
  | ChatEventPayload
  | MessagePayload
  | VotePayload
  | OptionsPayload
  | UiPayload
  | SessionUpdatePayload
  | {
    type: "handoff";
    value: HandoffPayloadType;
    server_message_id?: number;
    server_session_id?: string;
    client_message_id?: string;
    agent?: AgentType;
  };
