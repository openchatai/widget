import { Emitter } from "mitt"
import { MessageType } from "./messages"
import { ChatSessionType } from "./schemas"

export type ClientEmitterEvents = {
    connection_status: string
    message_delivered: MessageType
    user_message: MessageType
    heartbeat_ack: MessageType
    bot_message: MessageType
    session_update: ChatSessionType
    keyboard_options: string[]
}

export type ClientEmitter = Emitter<ClientEmitterEvents>