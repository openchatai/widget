import { MessageType } from "@lib/types";
import { genId } from "@lib/utils/genId";
import { Socket } from "socket.io-client";
import { StructuredSocketMessageType } from "../types/schemas";

interface Context<SocketMessage = StructuredSocketMessageType> {
    _message: SocketMessage;
    _socket?: Socket | null;

    onChatEvent?: (message: MessageType, _ctx: Context<SocketMessage>) => void;

    onBotMessage?: (message: MessageType, _ctx: Context<SocketMessage>) => void;

    onUi?: (message: MessageType, _ctx: Context<SocketMessage>) => void;

    onForm?: (message: MessageType, _ctx: Context<SocketMessage>) => void;

    onVote?: (message: Extract<SocketMessage, { type: "vote" }>, _ctx: Context<SocketMessage>) => void;

    onInfo?: (message: Extract<SocketMessage, { type: "info" }>, _ctx: Context<SocketMessage>) => void;

    onSessionUpdate?: (message: Extract<SocketMessage, { type: "session_update" }>, _ctx: Context<SocketMessage>) => void;

    onOptions?: (message: Extract<SocketMessage, { type: "options" }>, _ctx: Context<SocketMessage>) => void;

    onAny?: (message: SocketMessage, _ctx: Context<SocketMessage>) => void;
}

export function handleSocketMessages(_ctx: Context<StructuredSocketMessageType>) {
    const response = _ctx._message;

    if (response) {
        _ctx.onAny?.(response, _ctx)
    }

    switch (response.type) {
        case "message":
            {
                _ctx.onBotMessage?.({
                    type: "FROM_BOT",
                    component: "TEXT",
                    id: genId(15),
                    serverId: null,
                    bot: response.agent,
                    timestamp: response.timestamp,
                    data: {
                        message: response.value,
                    },
                }, _ctx);
                break;
            }
        case "info":
            _ctx.onInfo?.(response, _ctx);
            break;
        case "chat_event":
            {
                _ctx.onChatEvent?.({
                    component: "CHAT_EVENT",
                    type: "FROM_BOT",
                    id: genId(),
                    serverId: null,
                    data: {
                        event: response.value.event,
                        message: response.value.message
                    },
                    timestamp: response.timestamp
                }, _ctx);
                break;
            }
        case "session_update":
            _ctx.onSessionUpdate?.(response, _ctx);
            break;
        case "options":
            _ctx.onOptions?.(response, _ctx);
            break;
        case "ui":
            {
                const uiVal = response.value;
                _ctx.onUi?.({
                    type: "FROM_BOT",
                    component: uiVal.name,
                    data: uiVal.request_response,
                    serverId: null,
                    id: genId(),
                    bot: response.agent,
                    timestamp: response.timestamp,
                }, _ctx);
                break;
            }
        case "form":
            {
                const formVal = response.value;
                _ctx.onForm?.({
                    type: "FROM_BOT",
                    component: "FORM",
                    data: formVal,
                    serverId: null,
                    id: genId(),
                    bot: response.agent,
                    timestamp: response.timestamp,
                }, _ctx);
                break;
            }
        case "vote":
            {
                _ctx.onVote?.(response, _ctx);
                break;
            }
        default:
            break;
    }

}