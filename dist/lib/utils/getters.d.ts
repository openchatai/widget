import { ChatHistoryMessageType } from '@lib/types/schemas';
import { AxiosInstance } from 'axios';
export declare function createSession(instance: AxiosInstance, botToken: string): Promise<import('axios').AxiosResponse<{
    language: string | null;
    email: string | null;
    status: import('@lib/types/schemas').SessionStatus;
    channel: import('@lib/types/schemas').SessionChannel;
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
    ai_closure_type: import('@lib/types/schemas').AIClosureType | null;
    ai_billing_type: import('@lib/types/schemas').AIBillingType | null;
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
    sentiment: import('@lib/types/schemas').SentimentEnum | null;
    ticket_number: number;
    ai_phone_call_sid: string | null;
    ai_phone_call_recording_url: string | null;
    meta?: any;
}, any>>;
interface DayOfficeHours {
    from: string;
    to: string;
}
export declare const workingDays: readonly ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday", "WeekDays", "Everyday"];
type Day = typeof workingDays[number];
export type WorkingHours = {
    [K in Day]: DayOfficeHours;
};
export type InitialData = {
    logo: string;
    faq: [];
    initial_questions: string[];
    history: ChatHistoryMessageType[];
};
export declare function getInitData(instance: AxiosInstance, sessionId?: string): Promise<import('axios').AxiosResponse<InitialData | null | undefined, any>>;
export declare function getChatSessionById(instance: AxiosInstance, sessionId: string): Promise<import('axios').AxiosResponse<{
    language: string | null;
    email: string | null;
    status: import('@lib/types/schemas').SessionStatus;
    channel: import('@lib/types/schemas').SessionChannel;
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
    ai_closure_type: import('@lib/types/schemas').AIClosureType | null;
    ai_billing_type: import('@lib/types/schemas').AIBillingType | null;
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
    sentiment: import('@lib/types/schemas').SentimentEnum | null;
    ticket_number: number;
    ai_phone_call_sid: string | null;
    ai_phone_call_recording_url: string | null;
    meta?: any;
}, any>>;
export declare function getOfficeHours(instance: AxiosInstance): Promise<import('axios').AxiosResponse<WorkingHours, any>>;
export {};
