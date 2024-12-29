import { ChatAttachmentType } from "./schemas"

export interface MessageData {
    id: string
    content: { text: string }
    timestamp: string
    bot_token: string
    session_id: string
    headers?: Record<string, string>
    attachments?: ChatAttachmentType[]
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