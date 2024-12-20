import { CoreOptions } from "./index"
import type { ApiCaller } from "../client/api"
import { SessionManager } from "../session/session-manager"

export interface Transport {
    connect(): Promise<void>
    disconnect(): void
    sendMessage(messageData: MessageData): Promise<void>
    isConnected(): boolean
}

export type TransportOptions = {
    api: ApiCaller
    sessionManager: SessionManager
    coreOptions: CoreOptions
}

export interface MessageData {
    content: { text: string }
    id: string
    timestamp: string
    token: string
    bot_token: string
    session_id: string

    headers?: Record<string, string>
    attachments?: Array<{ url: string }>
    pathParams?: Record<string, string>
    queryParams?: Record<string, string>
    user?: {
        external_id?: string
        name?: string
        email?: string
        phone?: string
        customData?: Record<string, string>
        avatarUrl?: string
    }
    language?: string
}