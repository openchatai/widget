import { MessageType } from "./messages"
import { AgentType, ChatAttachmentType, ChatSessionType, MessageTypeEnum } from "./schemas"
import { Emitter } from 'mitt'

export interface SocketEventHandlers {
    [key: string | symbol]: ((...args: any[]) => void)
    session_update: (session: ChatSessionType) => void
    session_clear: () => void
    session_created: (session: ChatSessionType) => void
}

export type ClientEmitter = Emitter<SocketEventHandlers> 