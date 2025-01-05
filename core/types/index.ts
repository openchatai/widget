import { ChatAttachmentType } from "./schemas"

export * from "./messages"
export * from "./schemas"
export * from "./pub-sub"
export * from "./helpers"

export interface User {
    external_id?: string;
    name?: string;
    email?: string;
    phone?: string;
    customData?: Record<string, string>;
    avatarUrl?: string;
}

export interface SendMessageInput extends Record<string, unknown> {
    content: {
        text: string;
    };
    attachments?: Array<ChatAttachmentType>,
    id?: string;
    language?: string;
    user?: User
}

export interface CoreOptions {
    token: string
    apiUrl?: string
    transport?: 'socket' | 'http'
    socketUrl?: string
    headers?: Record<string, string>
    queryParams?: Record<string, string>
    pathParams?: Record<string, string>
    debug?: boolean
    language?: string
    user?: User
    contactToken?: string
    bot?: {
        name?: string
        avatarUrl?: string
        id?: number | null
        is_ai?: boolean
    }
    pollingInterval?: number
    soundEffectFiles?: {
        messageArrived?: string
    }
    theme?: {
        headerStyle?: "compact" | "basic"
        primaryColor?: string
        triggerOffset?: string
    }
    settings?: {
        persistSession?: boolean
        useSoundEffects?: boolean
    }
}
