/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
    "/backend/widget/v2/me": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["getCurrentContact"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/backend/widget/v2/prelude": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get the prelude for the widget */
        get: operations["widgetPrelude"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/backend/widget/v2/session/{sessionId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["getSession"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/backend/widget/v2/session/history/{sessionId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["getSessionHistory"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/backend/widget/v2/create-session": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["createChatSession"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/backend/widget/v2/chat/send": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["chatSend"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/backend/widget/v2/upload": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["uploadFile"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/backend/widget/v2/chat/vote": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["voteMessage"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/backend/widget/v2/me/create": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Create a contact for the widget
         * @description Create a contact for the widget, in un-authenticated contexts
         */
        post: operations["createContact"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        CreateContactDto: {
            email: string;
            name: string;
        };
        FileUploadDto: {
            /** Format: binary */
            file: string;
        };
        HandleContactMessageOutputDto: {
            /** @enum {boolean} */
            success: true;
            code?: string | "session_assigned_to_human_agent";
            options?: {
                /** @enum {string} */
                type: "options";
                value: string[];
            };
            autopilotResponse?: {
                /** @enum {string} */
                type: "text";
                value: {
                    error: boolean;
                    content: string;
                };
                id?: string;
            };
            uiResponse?: {
                /** @enum {string} */
                type: "ui";
                value: {
                    /** @enum {string} */
                    type: "ui_component";
                    request_response?: unknown;
                    name: string;
                    content?: string;
                };
            };
            sessionIsHandedOff?: boolean;
        } | {
            /** @enum {boolean} */
            success: false;
            error: {
                code?: string;
                message?: string;
            };
        };
        HttpChatInputDto: {
            /** Format: uuid */
            uuid: string;
            content: string;
            session_id: string;
            headers?: {
                [key: string]: string;
            } | null;
            bot_token: string;
            query_params?: {
                [key: string]: string;
            } | null;
            user?: {
                email?: string;
                name?: string;
                phone?: string;
                avatar?: string;
                customData?: {
                    [key: string]: string;
                };
            } | null;
            language?: string | null;
            attachments?: {
                id: string;
                name: string;
                size: number;
                type: string;
                url: string;
            }[] | null;
        };
        UploadWidgetFileDto: {
            fileName: string;
            fileUrl: string;
            clientFileId: string;
        };
        WidgetContactDto: {
            authenticationStatus: {
                /** @enum {boolean} */
                is: true;
            };
            contactId: string;
            contactName: string;
        } | {
            authenticationStatus: {
                /** @enum {boolean} */
                is: false;
            };
            contactId: unknown;
            contactName: string;
        };
        WidgetHistoryDto: {
            publicId: string;
            /** @enum {string} */
            type: "message" | "handoff" | "handoff_to_zendesk" | "agent_message" | "agent_joined" | "agent_comment" | "agent_took_session_from_ai" | "agent_reopened_session" | "ai_decided_to_resolve_the_issue" | "email_draft_message" | "followup" | "ai_assumed_the_session_resolved" | "user_confirmed_the_session_resolved";
            content: {
                text?: string | null;
            };
            sender: {
                /** @enum {string} */
                kind: "user" | "agent" | "ai" | "none" | "unknown";
                name?: string | null;
                avatar?: string | null;
            };
            sentAt?: string | null;
            actionCalls?: {
                actionName: string;
                args: {
                    [key: string]: unknown;
                };
                result?: {
                    [key: string]: unknown;
                } | null;
            }[] | null;
            attachments?: {
                id: string;
                name: string;
                size: number;
                type: string;
                url: string;
            }[] | null;
        };
        WidgetPreludeDto: {
            initialQuestions: string[];
            aiEnabled: boolean;
            officeHours: unknown & {
                monday?: {
                    from: string;
                    to: string;
                };
                tuesday?: {
                    from: string;
                    to: string;
                };
                wednesday?: {
                    from: string;
                    to: string;
                };
                thursday?: {
                    from: string;
                    to: string;
                };
                friday?: {
                    from: string;
                    to: string;
                };
                saturday?: {
                    from: string;
                    to: string;
                };
                sunday?: {
                    from: string;
                    to: string;
                };
                Everyday?: {
                    from: string;
                    to: string;
                };
                WeekDays?: {
                    from: string;
                    to: string;
                };
            };
            officeHoursTimezone: string | null;
            organizationName: string;
        };
        /** @description WidgetSession */
        WidgetSessionDto: {
            /** Format: uuid */
            id: string;
            createdAt: string;
            updatedAt: string;
            isHandedOff: boolean;
            isOpened: boolean;
            assignee: {
                /** @enum {string} */
                kind: "human" | "ai" | "none" | "unknown";
                name: string | null;
                avatarUrl: string | null;
            };
            channel: string;
            isVerified: boolean;
        };
        WidgetVoteDto: {
            /** @enum {string} */
            action: "upvote" | "downvote";
            sessionId: string;
            messagePublicId: string;
        };
        WidgetVoteResponseDto: {
            messagePublicId: string | null;
            success: boolean;
        };
        ErrorDto: {
            statusCode?: number;
            message?: string;
            error?: string;
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    getCurrentContact: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["WidgetContactDto"];
                };
            };
            /** @description Internal Server Error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorDto"];
                };
            };
        };
    };
    widgetPrelude: {
        parameters: {
            query?: never;
            header: {
                "X-Bot-Token": string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["WidgetPreludeDto"];
                };
            };
            /** @description Internal Server Error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorDto"];
                };
            };
        };
    };
    getSession: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                sessionId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["WidgetSessionDto"];
                };
            };
            /** @description Internal Server Error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorDto"];
                };
            };
        };
    };
    getSessionHistory: {
        parameters: {
            query?: {
                /** @description The timestamp of the last message received by the widget in order to get any messages after. */
                lastMessageTimestamp?: string;
            };
            header?: never;
            path: {
                sessionId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["WidgetHistoryDto"][];
                };
            };
            /** @description Internal Server Error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorDto"];
                };
            };
        };
    };
    createChatSession: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["WidgetSessionDto"];
                };
            };
            /** @description Internal Server Error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorDto"];
                };
            };
        };
    };
    chatSend: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["HttpChatInputDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HandleContactMessageOutputDto"];
                };
            };
            /** @description Internal Server Error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorDto"];
                };
            };
        };
    };
    uploadFile: {
        parameters: {
            query: {
                /** @description The id of the file */
                fileId: string;
                /** @description The id of the session */
                sessionId: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description The file to upload */
        requestBody: {
            content: {
                "multipart/form-data": components["schemas"]["FileUploadDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["UploadWidgetFileDto"];
                };
            };
            /** @description Internal Server Error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorDto"];
                };
            };
        };
    };
    voteMessage: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["WidgetVoteDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["WidgetVoteResponseDto"];
                };
            };
            /** @description Internal Server Error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorDto"];
                };
            };
        };
    };
    createContact: {
        parameters: {
            query?: never;
            header: {
                "x-bot-token": string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateContactDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["WidgetContactDto"];
                };
            };
            /** @description Internal Server Error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorDto"];
                };
            };
        };
    };
}
