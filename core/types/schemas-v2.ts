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

export enum MessageTypeEnum {
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
    type: z.nativeEnum(MessageTypeEnum),
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
    id: z.string().optional(),
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

const handleContactMessageOutputSchema = z.discriminatedUnion(
    'success',
    [
        z.object({
            success: z.literal(true),
            code: z.string().optional(),
            options: z
                .object({
                    type: z.literal('options'),
                    value: z.array(z.string()),
                })
                .optional(),
            autopilotResponse: z
                .object({
                    type: z.literal('text'),
                    value: z.object({
                        error: z.boolean(),
                        content: z.string(),
                    }),
                    id: z.string().optional(),
                })
                .optional(),
            uiResponse: z
                .object({
                    type: z.literal('ui'),
                    value: z.object({
                        type: z.literal('ui_component'),
                        request_response: z.unknown(),
                        name: z.string(),
                        content: z.string().optional(),
                    }),
                })
                .optional(),
            sessionIsHandedOff: z.boolean().optional(),
        }),
        z.object({
            success: z.literal(false),
            error: z.object({
                code: z.string().optional(),
                message: z.string().optional(),
            }),
        }),
    ],
);

const widgetVoteSchema = z.object({
    action: z.enum(['upvote', 'downvote']),
    sessionId: z.string(),
    messagePublicId: z.string(),
});

const widgetVoteResponseSchema = z.object({
    messagePublicId: z.string().nullable(),
    success: z.boolean(),
});

export type WidgetVoteResponseSchema = z.infer<typeof widgetVoteResponseSchema>;
export type HandleContactMessageOutputSchema = z.infer<typeof handleContactMessageOutputSchema>;
export type HttpChatInputSchema = z.infer<typeof httpChatInputDto>;
export type WidgetSessionSchema = z.infer<typeof widgetSessionSchema>;
export type WidgetHistorySchema = z.infer<typeof widgetHistorySchema>;
export type WidgetPreludeSchema = z.infer<typeof widgetPreludeSchema>;
export type WidgetVoteSchema = z.infer<typeof widgetVoteSchema>;
