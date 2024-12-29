import { z } from "zod";

const DayOfficeHoursSchema = z.object({
    from: z.string(),
    to: z.string(),
})

const officeHoursSchema = z.object({
    monday: DayOfficeHoursSchema.optional(),
    tuesday: DayOfficeHoursSchema.optional(),
    wednesday: DayOfficeHoursSchema.optional(),
    thursday: DayOfficeHoursSchema.optional(),
    friday: DayOfficeHoursSchema.optional(),
    saturday: DayOfficeHoursSchema.optional(),
    sunday: DayOfficeHoursSchema.optional(),
    Everyday: DayOfficeHoursSchema.optional(),
    WeekDays: DayOfficeHoursSchema.optional(),
});

const widgetPreludeSchema = z.object({
    initialQuestions: z.array(z.string()),
    aiEnabled: z.boolean(),
    officeHours: officeHoursSchema,
    officeHoursTimezone: z.string().nullable(),
    organizationName: z.string(),
})

export const chatAttachmentSchema = z.object({
    id: z.string(),
    name: z.string(),
    size: z.number(),
    type: z.string(),
    url: z.string(),
});

enum MessageType {
    MESSAGE = 'message',
    HANDOFF = 'handoff',
    HANDOFF_TO_ZENDESK = 'handoff_to_zendesk',
    AGENT_MESSAGE = 'agent_message',
    AGENT_JOINED = 'agent_joined',
    AGENT_COMMENT = 'agent_comment',
    AGENT_TOOK_SESSION_FROM_AI = 'agent_took_session_from_ai',
    AGENT_REOPENED_SESSION = 'agent_reopened_session',
    AI_DECIDED_TO_RESOLVE_THE_ISSUE = 'ai_decided_to_resolve_the_issue',
    EMAIL_DRAFT_MESSAGE = 'email_draft_message',
    FOLLOWUP = 'followup',
    AI_ASSUMED_THE_SESSION_RESOLVED = 'ai_assumed_the_session_resolved',
    CONTACT_RESOLVED_THE_SESSION = 'user_confirmed_the_session_resolved',
}

const widgetHistorySchema = z.object({
    publicId: z.string().optional().nullable(),
    type: z.nativeEnum(MessageType),
    sender: z.object({
        kind: z.enum(['user', 'agent', 'ai', 'none', 'unknown']),
        name: z.string().optional().nullable(),
        avatar: z.string().optional().nullable(),
    }),
    content: z.object({
        text: z.string().optional().nullable(),
    }),
    sentAt: z.date().optional().nullable(),
    actionCalls: z
        .array(
            z.object({
                actionName: z.string(),
                args: z.record(z.string(), z.unknown()),
                result: z.record(z.string(), z.unknown()).optional().nullable(),
            }),
        )
        .optional()
        .nullable(),
    attachments: z.array(chatAttachmentSchema).optional().nullable(),
})

const widgetSessionSchema = z.object({
    id: z.string().uuid(),
    createdAt: z.date(),
    updatedAt: z.date(),
    isHandedOff: z.boolean(),
    isOpened: z.boolean(),
    assignee: z.object({
        kind: z.enum(['human', 'ai', 'none', 'unknown']),
        name: z.string().nullable(),
    }),
    channel: z.string(),
})

const httpChatInputDto = z.object({
    content: z.string(),
    session_id: z.string(),
    headers: z.record(z.string(), z.string()),
    bot_token: z.string(),
    query_params: z.record(z.string(), z.string()).optional().nullable(),
    user: z.object({
        email: z.string().optional(),
        name: z.string().optional(),
        phone: z.string().optional(),
        avatar: z.string().optional(),
        customData: z.record(z.string(), z.string()).optional(),
    }),
    language: z.string().optional().nullable(),
    attachments: z.array(chatAttachmentSchema).optional().nullable(),
})

const handleContactMessageOutputSchema = z.union([
    z.object({
        success: z.literal(true),
        autopilotResponse: z
            .object({
                type: z.literal('text'),
                value: z.object({
                    content: z.string(),
                    error: z.boolean(),
                }),
                id: z.string().optional(),
            })
            .optional(),
        uiResponse: z
            .object({
                type: z.literal('ui'),
                value: z.object({
                    type: z.string(),
                    request_response: z.any(),
                    name: z.string(),
                    content: z.string(),
                    message_id: z.string().optional(),
                }),
            })
            .optional(),
        options: z
            .object({
                type: z.literal('options'),
                value: z.array(z.string()),
            })
            .optional(),
        sessionIsHandedOff: z.boolean().optional(),
    }),
    z.object({
        success: z.literal(false),
        error: z
            .object({
                message: z.string(),
                code: z.string().optional(),
            })
            .optional(),
    }),
    z.object({
        success: z.literal(true),
        code: z.string().optional(),
    }),
]);

export type HandleContactMessageOutputSchema = z.infer<typeof handleContactMessageOutputSchema>;
export type HttpChatInputSchema = z.infer<typeof httpChatInputDto>;
export type WidgetSessionSchema = z.infer<typeof widgetSessionSchema>;
export type WidgetHistorySchema = z.infer<typeof widgetHistorySchema>;
export type WidgetPreludeSchema = z.infer<typeof widgetPreludeSchema>;