import { MessageType } from "@lib/types";
import { genId } from "@lib/utils/genId";
import { Socket } from "socket.io-client";
import { SocketMessagePayload } from "./parse-structured-response";

interface Context {
    _message: SocketMessagePayload;
    _socket?: Socket;
    onMessageReady?: (message: MessageType, _ctx: Context) => void;
    onHandoff?: (message: Extract<MessageType, { type: "FROM_BOT" }>, _ctx: Context) => void;
    onSessionUpdate?: (message: SocketMessagePayload, _ctx: Context) => void;
    onOptions?: (message: Extract<SocketMessagePayload, { type: "options" }>, _ctx: Context) => void;
}

export function handleSocketMessages(_ctx: Context) {
    const response = _ctx._message;
    let message: MessageType | null = null;
    switch (response.type) {
        case "message":
            message = {
                id: response.server_message_id?.toString() ?? genId(15),
                type: "FROM_BOT",
                component: "TEXT",
                serverId: response?.server_message_id ?? null,
                data: {
                    message: response.value,
                },
                agent: response.agent,
            }
            break;
        case "info":
            break;
        case "chat_event":
            message = {
                component: "CHAT_EVENT",
                type: "FROM_BOT",
                id: genId(),
                serverId: null,
                data: {
                    event: response.value.event,
                    message: response.value.message
                }
            }
            break;
        case "session_update":
            _ctx.onSessionUpdate?.(response, _ctx);
            break;
        case "options":
            _ctx.onOptions?.(response, _ctx);
            break;
        case "handoff":
            message = {
                type: "FROM_BOT",
                id: response.server_message_id?.toString() ?? genId(),
                component: "HANDOFF",
                data: response.value,
                serverId: response?.server_message_id ?? null,
                agent: response.agent,
            };
            _ctx.onHandoff?.(message, _ctx);
            break;
        default:
            break;
    }
    if (message) {
        _ctx.onMessageReady?.(message, _ctx);
    }
    return message;
}