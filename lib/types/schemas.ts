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

export enum AIBillingType {
    hard = 'hard',
    light = 'light',
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
    AGENT_COMMENT = 'agent_comment',
    AGENT_TOOK_SESSION_FROM_AI = 'agent_took_session_from_ai',
    AI_DECIDED_TO_RESOLVE_THE_ISSUE = 'ai_decided_to_resolve_the_issue',
    EMAIL_DRAFT_MESSAGE = 'email_draft_message',
    FOLLOWUP = 'followup',
    AI_ASSUMED_THE_SESSION_RESOLVED = 'ai_assumed_the_session_resolved',
    CONTACT_RESOLVED_THE_SESSION = 'user_confirmed_the_session_resolved',
}

export const chatSessionSchema = z.object({
    status: z.nativeEnum(SessionStatus),
    channel: z.nativeEnum(SessionChannel),
    assignee_id: z.number().nullable(),
    summary: z.string().nullable(),
    classification: z.string().nullable(),
    contact_id: z.string().nullable(),
    copilot_id: z.string(),
    email: z.string().nullable(),
    email_thread_id: z.string().nullable(),
    group_id: z.string().nullable(),
    id: z.string(),
    is_notification_enabled: z.number(),
    short_token: z.string().nullable(),
    last_seen_at: z.date().nullable(),
    is_online: z.number(),
    ai_closure_type: z.nativeEnum(AIClosureType).nullable(),
    ai_billing_type: z.nativeEnum(AIBillingType).nullable(),
    language: z.string().nullable(),
    last_message: z.string().nullable(),
    last_message_at: z.date().nullable(),
    short_link: z.string().nullable(),
    meta: z.custom<any>().and(
        z.object({
            title: z.string().optional(),
            whatsappToNumber: z.string().optional(),
            recordingUrl: z.string().optional(),
            title_generation_type: z.enum(['user', 'system']).nullable(),
            summary: z.string().optional(),
            phoneNumber: z.string().optional(),
        }),
    ),
    mobileNumber: z.string().nullable(),
    queryOrgId: z.string().nullable(),
    created_at: z.date(),
    updated_at: z.date(),
    assignee: z
        .object({
            name: z.string(),
            email: z.string(),
            avatar_url: z.string().optional(),
        })
        .nullable(),
    fallback_channel: z.enum(['email', 'sms']).nullable(),
    sentiment: z.nativeEnum(SentimentEnum).nullable(),
    ticket_number: z.number(),
    ai_phone_call_sid: z.string().nullable(),
    ai_phone_call_recording_url: z.string().nullable(),
});

export const chatHistoryMessageSchema = z.object({
    message: z.string().nullable(),
    type: z.string().nullable(),
    agent_avatar: z.string().nullable(),
    agent_id: z.number().nullable(),
    agent_name: z.string().nullable(),
    api_called: z.number().nullable(),
    chatbot_id: z.string().nullable(),
    created_at: z.string(),
    debug_json: z.any().nullable(),
    extra_params: z.any(),
    from_user: z.number().nullable(),
    handoff_happened_during_office_hours: z.number().nullable(),
    id: z.number(),
    knowledgebase_called: z.number().nullable(),
    session_id: z.string(),
    updated_at: z.string().nullable(),
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
    is_stream_chunk: z.boolean().optional(),
    server_session_id: z.string(),
    client_message_id: z.string().optional(),
})

const voteSchema = z.object({
    type: z.literal('vote'),
    server_message_id: z.number().optional(),
    client_message_id: z.string().optional(),
    server_session_id: z.string(),
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

const formSchema = z.object({
    type: z.literal('form'),
    value: z.object({
        inferredArgs: z.any(),
        parametersSchema: z.object({
            pathParams: z.any(),
            queryParams: z.any(),
            bodyParams: z.any(),
        }),
    }),
});

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
    voteSchema,
    infoSchema,
    uiSchema,
    formSchema,
    chatEventSchema,
    optionsSchema,
    sessionUpdateSchema,
]).and(z.object({
    timestamp: z.string(),
    agent: agentSchema,
}));

export const consumerSchema = z.object({
    id: z.string(),
    copilot_id: z.string(),
    name: z.string().nullable(),
    created_at: z.string(),
    avatar_url: z.string().nullable(),
});

type ConsumerType = z.infer<typeof consumerSchema>
type ChatSessionType = z.infer<typeof chatSessionSchema>;
type StructuredSocketMessageType = z.infer<typeof structuredSocketMessageSchema>;
type ChatHistoryMessageType = z.infer<typeof chatHistoryMessageSchema>;
export type { ChatSessionType, StructuredSocketMessageType, ChatHistoryMessageType, ConsumerType };