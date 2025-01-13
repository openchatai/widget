import { AgentType } from "./messages"
import { ChatAttachmentType } from "./schemas-v2"

export * from "./messages"
export * from "./schemas-v2"
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
    headers?: Record<string, string>
    queryParams?: Record<string, string>
    pathParams?: Record<string, string>
    collectUserData?: boolean
    debug?: boolean
    initialMessages?: string[]
    language?: string
    user?: User
    contactToken?: string;
    bot?: AgentType;
    pollingInterval?: number
    soundEffectFiles?: {
        messageArrived?: string
    }
    theme?: {
        primaryColor?: string
        triggerOffset?: string
    }
    settings?: {
        persistSession?: boolean
        useSoundEffects?: boolean
    }
    assets?: {
        organizationLogo?: string
    }
}
