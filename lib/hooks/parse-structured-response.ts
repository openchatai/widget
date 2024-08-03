import { HandoffPayloadType } from "@lib/types";

export function isUiElement(value: unknown): value is UiElement {
    return (
        typeof value === "object" &&
        value !== null &&
        "request_response" in value
    );
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
    type: "form" | "ui_component"
    request_response: unknown;
    name: string;
    message_id?: string;
    content: string;
    incoming_message_id: string;
}

interface UiPayload {
    type: "ui";
    client_message_id: string;
    server_session_id: string;
    value: UiElement;
    agent?: AgentType;
}

export type SocketMessageParams =
    | InfoPayload
    | MessagePayload
    | VotePayload
    | UiPayload
    | {
        type: "handoff"
        value: HandoffPayloadType;
        server_message_id?: number;
        server_session_id?: string;
        client_message_id?: string;
        agent?: AgentType
    };

