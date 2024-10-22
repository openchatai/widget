import { MessageType } from '../types';
import { Socket } from 'socket.io-client';
import { StructuredSocketMessageType } from '../types/schemas';
interface Context<SocketMessage = StructuredSocketMessageType> {
    _message: SocketMessage;
    _socket?: Socket | null;
    onChatEvent?: (message: MessageType, _ctx: Context<SocketMessage>) => void;
    onBotMessage?: (message: MessageType, _ctx: Context<SocketMessage>) => void;
    onUi?: (message: MessageType, _ctx: Context<SocketMessage>) => void;
    onForm?: (message: MessageType, _ctx: Context<SocketMessage>) => void;
    onVote?: (message: Extract<SocketMessage, {
        type: "vote";
    }>, _ctx: Context<SocketMessage>) => void;
    onInfo?: (message: Extract<SocketMessage, {
        type: "info";
    }>, _ctx: Context<SocketMessage>) => void;
    onSessionUpdate?: (message: Extract<SocketMessage, {
        type: "session_update";
    }>, _ctx: Context<SocketMessage>) => void;
    onOptions?: (message: Extract<SocketMessage, {
        type: "options";
    }>, _ctx: Context<SocketMessage>) => void;
    onAny?: (message: SocketMessage, _ctx: Context<SocketMessage>) => void;
}
export declare function handleSocketMessages(_ctx: Context<StructuredSocketMessageType>): void;
export {};
