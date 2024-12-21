import z from "zod";

export enum SessionStatus {
    OPEN = 0,
    CLOSED_RESOLVED = 1,
    CLOSED_UNRESOLVED = 2,
}

export enum SessionChannel {
    WEB = 'web',
    WEB_VOICE = 'web_voice',
    PHONE_VOICE = 'phone_voice',
    EMAIL = 'email',
    SMS = 'sms',
    WHATSAPP = 'whatsapp',
    API = 'api',
}

export enum AIClosureType {
    resolved = 'resolved',
    assumed_resolved = 'assumed_resolved',
    handed_off = 'handed_off',
}

export enum SentimentEnum {
    happy = 'happy',
    neutral = 'neutral',
    angry = 'angry',
}

export enum MessageTypeEnum {
    MESSAGE = 'message',
    HANDOFF = 'handoff',
    HANDOFF_TO_ZENDESK = 'handoff_to_zendesk',
    AGENT_MESSAGE = 'agent_message',
    AGENT_JOINED = 'agent_joined',
    AGENT_TOOK_SESSION_FROM_AI = 'agent_took_session_from_ai',
    AI_DECIDED_TO_RESOLVE_THE_ISSUE = 'ai_decided_to_resolve_the_issue',
    EMAIL_DRAFT_MESSAGE = 'email_draft_message',
    FOLLOWUP = 'followup',
}

export const chatSessionSchema = z.object({
    id: z.string(),
    ai_closure_type: z.nativeEnum(AIClosureType).nullable(),
    assignee_id: z.number().nullable(),
    channel: z.nativeEnum(SessionChannel),
    summary: z.string().nullable(),
    status: z.nativeEnum(SessionStatus),
    language: z.string().nullable(),
    last_message: z.string().nullable(),
    last_message_at: z.date().nullable(),
    assignee: z
        .object({
            name: z.string(),
            email: z.string(),
            avatar_url: z.string().optional(),
        })
        .nullable().optional(),
    sentiment: z.nativeEnum(SentimentEnum).nullable(),
});

export type ChatAttachmentType = {
    id: string;
    name: string;
    size: number;
    type: string;
    url: string;
}

export const chatAttachmentSchema = z.object({
    id: z.string(),
    name: z.string(),
    size: z.number(),
    type: z.string(),
    url: z.string(),
}) as z.ZodType<ChatAttachmentType>;

export const chatHistoryMessageSchema = z.object({
    publicId: z.string().uuid(),
    message: z.string().nullable(),
    type: z.string().nullable(),
    agent_avatar: z.string().nullable(),
    agent_id: z.number().nullable(),
    agent_name: z.string().nullable(),
    created_at: z.string(),
    from_user: z.boolean().nullable(),
    handoff_happened_during_office_hours: z.boolean().nullable(),
    session_id: z.string(),
    updated_at: z.string().nullable(),
    attachments: z.array(chatAttachmentSchema).optional(),
})
// ---------- socket responses ----------

const agentSchema = z.object({
    name: z.string(),
    is_ai: z.boolean(),
    profile_picture: z.string().optional().nullable(),
    id: z.string().nullable(),
})

const messageSchema = z.object({
    type: z.literal('message'),
    value: z.string(),
    attachments: z.array(chatAttachmentSchema).optional(),
    is_stream_chunk: z.boolean().optional(),
    server_session_id: z.string(),
    client_message_id: z.string().optional(),
    server_message_id: z.string(),
})

const infoSchema = z.object({
    type: z.literal('info'),
    value: z.string(),
})

const uiSchema = z.object({
    type: z.literal('ui'),
    value: z.object({
        type: z.string(),
        request_response: z.any(),
        name: z.string(),
        content: z.string(),
        message_id: z.string().optional(),
    }),
    client_message_id: z.string().optional(),
    server_session_id: z.string(),
})

const chatEventSchema = z.object({
    type: z.literal('chat_event'),
    value: z.object({
        event: z.nativeEnum(MessageTypeEnum),
        message: z.string(),
    }),
});

const optionsSchema = z.object({
    type: z.literal('options'),
    value: z.object({
        options: z.array(z.string()),
    }),
    server_session_id: z.string(),
});

const sessionUpdateSchema = z.object({
    type: z.literal('session_update'),
    value: z.object({
        session: chatSessionSchema
    }),
    server_session_id: z.string(),
})

export const structuredSocketMessageSchema = z.discriminatedUnion("type", [
    messageSchema,
    infoSchema,
    uiSchema,
    chatEventSchema,
    optionsSchema,
    sessionUpdateSchema,
]).and(z.object({
    timestamp: z.string(),
    agent: agentSchema,
}));

export const consumerSchema = z.object({
    id: z.string(),
    name: z.string().nullable(),
    created_at: z.string(),
    avatar_url: z.string().nullable(),
    email: z.string().nullable(),
});

type AgentType = z.infer<typeof agentSchema>;
type ConsumerType = z.infer<typeof consumerSchema>
type ChatSessionType = z.infer<typeof chatSessionSchema>;
type ChatSessionWithStatus = ChatSessionType & {
    isSessionClosed: boolean
    isAssignedToAi: boolean
    isAssignedToHuman: boolean
    isPendingHuman: boolean
}
type StructuredSocketMessageType = z.infer<typeof structuredSocketMessageSchema>;
type ChatHistoryMessageType = z.infer<typeof chatHistoryMessageSchema>;
export type { AgentType, ConsumerType, ChatSessionType, StructuredSocketMessageType, ChatHistoryMessageType, ChatSessionWithStatus };