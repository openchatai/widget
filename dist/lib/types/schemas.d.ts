import { default as z } from 'zod';
export declare enum SessionStatus {
    OPEN = 0,
    CLOSED_RESOLVED = 1,
    CLOSED_UNRESOLVED = 2
}
export declare enum SessionChannel {
    WEB = "web",
    WEB_VOICE = "web_voice",
    PHONE_VOICE = "phone_voice",
    EMAIL = "email",
    SMS = "sms",
    WHATSAPP = "whatsapp",
    API = "api"
}
export declare enum AIClosureType {
    resolved = "resolved",
    assumed_resolved = "assumed_resolved",
    handed_off = "handed_off"
}
export declare enum AIBillingType {
    hard = "hard",
    light = "light"
}
export declare enum SentimentEnum {
    happy = "happy",
    neutral = "neutral",
    angry = "angry"
}
export declare enum MessageTypeEnum {
    MESSAGE = "message",
    HANDOFF = "handoff",
    HANDOFF_TO_ZENDESK = "handoff_to_zendesk",
    AGENT_MESSAGE = "agent_message",
    AGENT_JOINED = "agent_joined",
    AGENT_COMMENT = "agent_comment",
    AGENT_TOOK_SESSION_FROM_AI = "agent_took_session_from_ai",
    AI_DECIDED_TO_RESOLVE_THE_ISSUE = "ai_decided_to_resolve_the_issue",
    EMAIL_DRAFT_MESSAGE = "email_draft_message",
    FOLLOWUP = "followup",
    AI_ASSUMED_THE_SESSION_RESOLVED = "ai_assumed_the_session_resolved",
    CONTACT_RESOLVED_THE_SESSION = "user_confirmed_the_session_resolved"
}
export declare const chatSessionSchema: z.ZodObject<{
    status: z.ZodNativeEnum<typeof SessionStatus>;
    channel: z.ZodNativeEnum<typeof SessionChannel>;
    assignee_id: z.ZodNullable<z.ZodNumber>;
    summary: z.ZodNullable<z.ZodString>;
    classification: z.ZodNullable<z.ZodString>;
    contact_id: z.ZodNullable<z.ZodString>;
    copilot_id: z.ZodString;
    email: z.ZodNullable<z.ZodString>;
    email_thread_id: z.ZodNullable<z.ZodString>;
    group_id: z.ZodNullable<z.ZodString>;
    id: z.ZodString;
    is_notification_enabled: z.ZodNumber;
    short_token: z.ZodNullable<z.ZodString>;
    last_seen_at: z.ZodNullable<z.ZodDate>;
    is_online: z.ZodNumber;
    ai_closure_type: z.ZodNullable<z.ZodNativeEnum<typeof AIClosureType>>;
    ai_billing_type: z.ZodNullable<z.ZodNativeEnum<typeof AIBillingType>>;
    language: z.ZodNullable<z.ZodString>;
    last_message: z.ZodNullable<z.ZodString>;
    last_message_at: z.ZodNullable<z.ZodDate>;
    short_link: z.ZodNullable<z.ZodString>;
    meta: z.ZodIntersection<z.ZodType<any, z.ZodTypeDef, any>, z.ZodObject<{
        title: z.ZodOptional<z.ZodString>;
        whatsappToNumber: z.ZodOptional<z.ZodString>;
        recordingUrl: z.ZodOptional<z.ZodString>;
        title_generation_type: z.ZodNullable<z.ZodEnum<["user", "system"]>>;
        summary: z.ZodOptional<z.ZodString>;
        phoneNumber: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        title_generation_type: "user" | "system" | null;
        summary?: string | undefined;
        title?: string | undefined;
        whatsappToNumber?: string | undefined;
        recordingUrl?: string | undefined;
        phoneNumber?: string | undefined;
    }, {
        title_generation_type: "user" | "system" | null;
        summary?: string | undefined;
        title?: string | undefined;
        whatsappToNumber?: string | undefined;
        recordingUrl?: string | undefined;
        phoneNumber?: string | undefined;
    }>>;
    mobileNumber: z.ZodNullable<z.ZodString>;
    queryOrgId: z.ZodNullable<z.ZodString>;
    created_at: z.ZodDate;
    updated_at: z.ZodDate;
    assignee: z.ZodNullable<z.ZodObject<{
        name: z.ZodString;
        email: z.ZodString;
        avatar_url: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        email: string;
        name: string;
        avatar_url?: string | undefined;
    }, {
        email: string;
        name: string;
        avatar_url?: string | undefined;
    }>>;
    fallback_channel: z.ZodNullable<z.ZodEnum<["email", "sms"]>>;
    sentiment: z.ZodNullable<z.ZodNativeEnum<typeof SentimentEnum>>;
    ticket_number: z.ZodNumber;
    ai_phone_call_sid: z.ZodNullable<z.ZodString>;
    ai_phone_call_recording_url: z.ZodNullable<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    language: string | null;
    email: string | null;
    status: SessionStatus;
    channel: SessionChannel;
    assignee_id: number | null;
    summary: string | null;
    classification: string | null;
    contact_id: string | null;
    copilot_id: string;
    email_thread_id: string | null;
    group_id: string | null;
    id: string;
    is_notification_enabled: number;
    short_token: string | null;
    last_seen_at: Date | null;
    is_online: number;
    ai_closure_type: AIClosureType | null;
    ai_billing_type: AIBillingType | null;
    last_message: string | null;
    last_message_at: Date | null;
    short_link: string | null;
    mobileNumber: string | null;
    queryOrgId: string | null;
    created_at: Date;
    updated_at: Date;
    assignee: {
        email: string;
        name: string;
        avatar_url?: string | undefined;
    } | null;
    fallback_channel: "email" | "sms" | null;
    sentiment: SentimentEnum | null;
    ticket_number: number;
    ai_phone_call_sid: string | null;
    ai_phone_call_recording_url: string | null;
    meta?: any;
}, {
    language: string | null;
    email: string | null;
    status: SessionStatus;
    channel: SessionChannel;
    assignee_id: number | null;
    summary: string | null;
    classification: string | null;
    contact_id: string | null;
    copilot_id: string;
    email_thread_id: string | null;
    group_id: string | null;
    id: string;
    is_notification_enabled: number;
    short_token: string | null;
    last_seen_at: Date | null;
    is_online: number;
    ai_closure_type: AIClosureType | null;
    ai_billing_type: AIBillingType | null;
    last_message: string | null;
    last_message_at: Date | null;
    short_link: string | null;
    mobileNumber: string | null;
    queryOrgId: string | null;
    created_at: Date;
    updated_at: Date;
    assignee: {
        email: string;
        name: string;
        avatar_url?: string | undefined;
    } | null;
    fallback_channel: "email" | "sms" | null;
    sentiment: SentimentEnum | null;
    ticket_number: number;
    ai_phone_call_sid: string | null;
    ai_phone_call_recording_url: string | null;
    meta?: any;
}>;
export declare const chatHistoryMessageSchema: z.ZodObject<{
    message: z.ZodNullable<z.ZodString>;
    type: z.ZodNullable<z.ZodString>;
    agent_avatar: z.ZodNullable<z.ZodString>;
    agent_id: z.ZodNullable<z.ZodNumber>;
    agent_name: z.ZodNullable<z.ZodString>;
    api_called: z.ZodNullable<z.ZodBoolean>;
    chatbot_id: z.ZodNullable<z.ZodString>;
    created_at: z.ZodString;
    debug_json: z.ZodNullable<z.ZodAny>;
    extra_params: z.ZodAny;
    from_user: z.ZodNullable<z.ZodBoolean>;
    handoff_happened_during_office_hours: z.ZodNullable<z.ZodBoolean>;
    id: z.ZodNumber;
    knowledgebase_called: z.ZodNullable<z.ZodBoolean>;
    session_id: z.ZodString;
    updated_at: z.ZodNullable<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    message: string | null;
    type: string | null;
    id: number;
    created_at: string;
    updated_at: string | null;
    agent_avatar: string | null;
    agent_id: number | null;
    agent_name: string | null;
    api_called: boolean | null;
    chatbot_id: string | null;
    from_user: boolean | null;
    handoff_happened_during_office_hours: boolean | null;
    knowledgebase_called: boolean | null;
    session_id: string;
    debug_json?: any;
    extra_params?: any;
}, {
    message: string | null;
    type: string | null;
    id: number;
    created_at: string;
    updated_at: string | null;
    agent_avatar: string | null;
    agent_id: number | null;
    agent_name: string | null;
    api_called: boolean | null;
    chatbot_id: string | null;
    from_user: boolean | null;
    handoff_happened_during_office_hours: boolean | null;
    knowledgebase_called: boolean | null;
    session_id: string;
    debug_json?: any;
    extra_params?: any;
}>;
export declare const structuredSocketMessageSchema: z.ZodIntersection<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
    type: z.ZodLiteral<"message">;
    value: z.ZodString;
    is_stream_chunk: z.ZodOptional<z.ZodBoolean>;
    server_session_id: z.ZodString;
    client_message_id: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    value: string;
    type: "message";
    server_session_id: string;
    is_stream_chunk?: boolean | undefined;
    client_message_id?: string | undefined;
}, {
    value: string;
    type: "message";
    server_session_id: string;
    is_stream_chunk?: boolean | undefined;
    client_message_id?: string | undefined;
}>, z.ZodObject<{
    type: z.ZodLiteral<"vote">;
    server_message_id: z.ZodOptional<z.ZodNumber>;
    client_message_id: z.ZodOptional<z.ZodString>;
    server_session_id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "vote";
    server_session_id: string;
    client_message_id?: string | undefined;
    server_message_id?: number | undefined;
}, {
    type: "vote";
    server_session_id: string;
    client_message_id?: string | undefined;
    server_message_id?: number | undefined;
}>, z.ZodObject<{
    type: z.ZodLiteral<"info">;
    value: z.ZodString;
}, "strip", z.ZodTypeAny, {
    value: string;
    type: "info";
}, {
    value: string;
    type: "info";
}>, z.ZodObject<{
    type: z.ZodLiteral<"ui">;
    value: z.ZodObject<{
        type: z.ZodString;
        request_response: z.ZodAny;
        name: z.ZodString;
        content: z.ZodString;
        message_id: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        type: string;
        name: string;
        content: string;
        request_response?: any;
        message_id?: string | undefined;
    }, {
        type: string;
        name: string;
        content: string;
        request_response?: any;
        message_id?: string | undefined;
    }>;
    client_message_id: z.ZodOptional<z.ZodString>;
    server_session_id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    value: {
        type: string;
        name: string;
        content: string;
        request_response?: any;
        message_id?: string | undefined;
    };
    type: "ui";
    server_session_id: string;
    client_message_id?: string | undefined;
}, {
    value: {
        type: string;
        name: string;
        content: string;
        request_response?: any;
        message_id?: string | undefined;
    };
    type: "ui";
    server_session_id: string;
    client_message_id?: string | undefined;
}>, z.ZodObject<{
    type: z.ZodLiteral<"form">;
    value: z.ZodObject<{
        inferredArgs: z.ZodAny;
        parametersSchema: z.ZodObject<{
            pathParams: z.ZodAny;
            queryParams: z.ZodAny;
            bodyParams: z.ZodAny;
        }, "strip", z.ZodTypeAny, {
            pathParams?: any;
            queryParams?: any;
            bodyParams?: any;
        }, {
            pathParams?: any;
            queryParams?: any;
            bodyParams?: any;
        }>;
    }, "strip", z.ZodTypeAny, {
        parametersSchema: {
            pathParams?: any;
            queryParams?: any;
            bodyParams?: any;
        };
        inferredArgs?: any;
    }, {
        parametersSchema: {
            pathParams?: any;
            queryParams?: any;
            bodyParams?: any;
        };
        inferredArgs?: any;
    }>;
}, "strip", z.ZodTypeAny, {
    value: {
        parametersSchema: {
            pathParams?: any;
            queryParams?: any;
            bodyParams?: any;
        };
        inferredArgs?: any;
    };
    type: "form";
}, {
    value: {
        parametersSchema: {
            pathParams?: any;
            queryParams?: any;
            bodyParams?: any;
        };
        inferredArgs?: any;
    };
    type: "form";
}>, z.ZodObject<{
    type: z.ZodLiteral<"chat_event">;
    value: z.ZodObject<{
        event: z.ZodNativeEnum<typeof MessageTypeEnum>;
        message: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        message: string;
        event: MessageTypeEnum;
    }, {
        message: string;
        event: MessageTypeEnum;
    }>;
}, "strip", z.ZodTypeAny, {
    value: {
        message: string;
        event: MessageTypeEnum;
    };
    type: "chat_event";
}, {
    value: {
        message: string;
        event: MessageTypeEnum;
    };
    type: "chat_event";
}>, z.ZodObject<{
    type: z.ZodLiteral<"options">;
    value: z.ZodObject<{
        options: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        options: string[];
    }, {
        options: string[];
    }>;
    server_session_id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    value: {
        options: string[];
    };
    type: "options";
    server_session_id: string;
}, {
    value: {
        options: string[];
    };
    type: "options";
    server_session_id: string;
}>, z.ZodObject<{
    type: z.ZodLiteral<"session_update">;
    value: z.ZodObject<{
        session: z.ZodObject<{
            status: z.ZodNativeEnum<typeof SessionStatus>;
            channel: z.ZodNativeEnum<typeof SessionChannel>;
            assignee_id: z.ZodNullable<z.ZodNumber>;
            summary: z.ZodNullable<z.ZodString>;
            classification: z.ZodNullable<z.ZodString>;
            contact_id: z.ZodNullable<z.ZodString>;
            copilot_id: z.ZodString;
            email: z.ZodNullable<z.ZodString>;
            email_thread_id: z.ZodNullable<z.ZodString>;
            group_id: z.ZodNullable<z.ZodString>;
            id: z.ZodString;
            is_notification_enabled: z.ZodNumber;
            short_token: z.ZodNullable<z.ZodString>;
            last_seen_at: z.ZodNullable<z.ZodDate>;
            is_online: z.ZodNumber;
            ai_closure_type: z.ZodNullable<z.ZodNativeEnum<typeof AIClosureType>>;
            ai_billing_type: z.ZodNullable<z.ZodNativeEnum<typeof AIBillingType>>;
            language: z.ZodNullable<z.ZodString>;
            last_message: z.ZodNullable<z.ZodString>;
            last_message_at: z.ZodNullable<z.ZodDate>;
            short_link: z.ZodNullable<z.ZodString>;
            meta: z.ZodIntersection<z.ZodType<any, z.ZodTypeDef, any>, z.ZodObject<{
                title: z.ZodOptional<z.ZodString>;
                whatsappToNumber: z.ZodOptional<z.ZodString>;
                recordingUrl: z.ZodOptional<z.ZodString>;
                title_generation_type: z.ZodNullable<z.ZodEnum<["user", "system"]>>;
                summary: z.ZodOptional<z.ZodString>;
                phoneNumber: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                title_generation_type: "user" | "system" | null;
                summary?: string | undefined;
                title?: string | undefined;
                whatsappToNumber?: string | undefined;
                recordingUrl?: string | undefined;
                phoneNumber?: string | undefined;
            }, {
                title_generation_type: "user" | "system" | null;
                summary?: string | undefined;
                title?: string | undefined;
                whatsappToNumber?: string | undefined;
                recordingUrl?: string | undefined;
                phoneNumber?: string | undefined;
            }>>;
            mobileNumber: z.ZodNullable<z.ZodString>;
            queryOrgId: z.ZodNullable<z.ZodString>;
            created_at: z.ZodDate;
            updated_at: z.ZodDate;
            assignee: z.ZodNullable<z.ZodObject<{
                name: z.ZodString;
                email: z.ZodString;
                avatar_url: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                email: string;
                name: string;
                avatar_url?: string | undefined;
            }, {
                email: string;
                name: string;
                avatar_url?: string | undefined;
            }>>;
            fallback_channel: z.ZodNullable<z.ZodEnum<["email", "sms"]>>;
            sentiment: z.ZodNullable<z.ZodNativeEnum<typeof SentimentEnum>>;
            ticket_number: z.ZodNumber;
            ai_phone_call_sid: z.ZodNullable<z.ZodString>;
            ai_phone_call_recording_url: z.ZodNullable<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            language: string | null;
            email: string | null;
            status: SessionStatus;
            channel: SessionChannel;
            assignee_id: number | null;
            summary: string | null;
            classification: string | null;
            contact_id: string | null;
            copilot_id: string;
            email_thread_id: string | null;
            group_id: string | null;
            id: string;
            is_notification_enabled: number;
            short_token: string | null;
            last_seen_at: Date | null;
            is_online: number;
            ai_closure_type: AIClosureType | null;
            ai_billing_type: AIBillingType | null;
            last_message: string | null;
            last_message_at: Date | null;
            short_link: string | null;
            mobileNumber: string | null;
            queryOrgId: string | null;
            created_at: Date;
            updated_at: Date;
            assignee: {
                email: string;
                name: string;
                avatar_url?: string | undefined;
            } | null;
            fallback_channel: "email" | "sms" | null;
            sentiment: SentimentEnum | null;
            ticket_number: number;
            ai_phone_call_sid: string | null;
            ai_phone_call_recording_url: string | null;
            meta?: any;
        }, {
            language: string | null;
            email: string | null;
            status: SessionStatus;
            channel: SessionChannel;
            assignee_id: number | null;
            summary: string | null;
            classification: string | null;
            contact_id: string | null;
            copilot_id: string;
            email_thread_id: string | null;
            group_id: string | null;
            id: string;
            is_notification_enabled: number;
            short_token: string | null;
            last_seen_at: Date | null;
            is_online: number;
            ai_closure_type: AIClosureType | null;
            ai_billing_type: AIBillingType | null;
            last_message: string | null;
            last_message_at: Date | null;
            short_link: string | null;
            mobileNumber: string | null;
            queryOrgId: string | null;
            created_at: Date;
            updated_at: Date;
            assignee: {
                email: string;
                name: string;
                avatar_url?: string | undefined;
            } | null;
            fallback_channel: "email" | "sms" | null;
            sentiment: SentimentEnum | null;
            ticket_number: number;
            ai_phone_call_sid: string | null;
            ai_phone_call_recording_url: string | null;
            meta?: any;
        }>;
    }, "strip", z.ZodTypeAny, {
        session: {
            language: string | null;
            email: string | null;
            status: SessionStatus;
            channel: SessionChannel;
            assignee_id: number | null;
            summary: string | null;
            classification: string | null;
            contact_id: string | null;
            copilot_id: string;
            email_thread_id: string | null;
            group_id: string | null;
            id: string;
            is_notification_enabled: number;
            short_token: string | null;
            last_seen_at: Date | null;
            is_online: number;
            ai_closure_type: AIClosureType | null;
            ai_billing_type: AIBillingType | null;
            last_message: string | null;
            last_message_at: Date | null;
            short_link: string | null;
            mobileNumber: string | null;
            queryOrgId: string | null;
            created_at: Date;
            updated_at: Date;
            assignee: {
                email: string;
                name: string;
                avatar_url?: string | undefined;
            } | null;
            fallback_channel: "email" | "sms" | null;
            sentiment: SentimentEnum | null;
            ticket_number: number;
            ai_phone_call_sid: string | null;
            ai_phone_call_recording_url: string | null;
            meta?: any;
        };
    }, {
        session: {
            language: string | null;
            email: string | null;
            status: SessionStatus;
            channel: SessionChannel;
            assignee_id: number | null;
            summary: string | null;
            classification: string | null;
            contact_id: string | null;
            copilot_id: string;
            email_thread_id: string | null;
            group_id: string | null;
            id: string;
            is_notification_enabled: number;
            short_token: string | null;
            last_seen_at: Date | null;
            is_online: number;
            ai_closure_type: AIClosureType | null;
            ai_billing_type: AIBillingType | null;
            last_message: string | null;
            last_message_at: Date | null;
            short_link: string | null;
            mobileNumber: string | null;
            queryOrgId: string | null;
            created_at: Date;
            updated_at: Date;
            assignee: {
                email: string;
                name: string;
                avatar_url?: string | undefined;
            } | null;
            fallback_channel: "email" | "sms" | null;
            sentiment: SentimentEnum | null;
            ticket_number: number;
            ai_phone_call_sid: string | null;
            ai_phone_call_recording_url: string | null;
            meta?: any;
        };
    }>;
    server_session_id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    value: {
        session: {
            language: string | null;
            email: string | null;
            status: SessionStatus;
            channel: SessionChannel;
            assignee_id: number | null;
            summary: string | null;
            classification: string | null;
            contact_id: string | null;
            copilot_id: string;
            email_thread_id: string | null;
            group_id: string | null;
            id: string;
            is_notification_enabled: number;
            short_token: string | null;
            last_seen_at: Date | null;
            is_online: number;
            ai_closure_type: AIClosureType | null;
            ai_billing_type: AIBillingType | null;
            last_message: string | null;
            last_message_at: Date | null;
            short_link: string | null;
            mobileNumber: string | null;
            queryOrgId: string | null;
            created_at: Date;
            updated_at: Date;
            assignee: {
                email: string;
                name: string;
                avatar_url?: string | undefined;
            } | null;
            fallback_channel: "email" | "sms" | null;
            sentiment: SentimentEnum | null;
            ticket_number: number;
            ai_phone_call_sid: string | null;
            ai_phone_call_recording_url: string | null;
            meta?: any;
        };
    };
    type: "session_update";
    server_session_id: string;
}, {
    value: {
        session: {
            language: string | null;
            email: string | null;
            status: SessionStatus;
            channel: SessionChannel;
            assignee_id: number | null;
            summary: string | null;
            classification: string | null;
            contact_id: string | null;
            copilot_id: string;
            email_thread_id: string | null;
            group_id: string | null;
            id: string;
            is_notification_enabled: number;
            short_token: string | null;
            last_seen_at: Date | null;
            is_online: number;
            ai_closure_type: AIClosureType | null;
            ai_billing_type: AIBillingType | null;
            last_message: string | null;
            last_message_at: Date | null;
            short_link: string | null;
            mobileNumber: string | null;
            queryOrgId: string | null;
            created_at: Date;
            updated_at: Date;
            assignee: {
                email: string;
                name: string;
                avatar_url?: string | undefined;
            } | null;
            fallback_channel: "email" | "sms" | null;
            sentiment: SentimentEnum | null;
            ticket_number: number;
            ai_phone_call_sid: string | null;
            ai_phone_call_recording_url: string | null;
            meta?: any;
        };
    };
    type: "session_update";
    server_session_id: string;
}>]>, z.ZodObject<{
    timestamp: z.ZodString;
    agent: z.ZodObject<{
        name: z.ZodString;
        is_ai: z.ZodBoolean;
        profile_picture: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        id: z.ZodNullable<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string | null;
        name: string;
        is_ai: boolean;
        profile_picture?: string | null | undefined;
    }, {
        id: string | null;
        name: string;
        is_ai: boolean;
        profile_picture?: string | null | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    agent: {
        id: string | null;
        name: string;
        is_ai: boolean;
        profile_picture?: string | null | undefined;
    };
    timestamp: string;
}, {
    agent: {
        id: string | null;
        name: string;
        is_ai: boolean;
        profile_picture?: string | null | undefined;
    };
    timestamp: string;
}>>;
type ChatSessionType = z.infer<typeof chatSessionSchema>;
type StructuredSocketMessageType = z.infer<typeof structuredSocketMessageSchema>;
type ChatHistoryMessageType = z.infer<typeof chatHistoryMessageSchema>;
export type { ChatSessionType, StructuredSocketMessageType, ChatHistoryMessageType };
