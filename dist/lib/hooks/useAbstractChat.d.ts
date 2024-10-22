import { LangType } from '../locales';
import { MessageType, UserObject } from '../types';
import { AxiosInstance } from 'axios';
import { ReactNode } from 'react';
import { ChatSessionType } from '../types/schemas';
type useChatOptions = {
    socketUrl: string;
    apiUrl: string;
    botToken: string;
    headers: Record<string, string>;
    queryParams: Record<string, string>;
    pathParams: Record<string, string>;
    onSessionDestroy?: () => void;
    defaultHookSettings?: HookSettings;
    userData?: UserObject;
    language?: LangType;
};
type ChatState = {
    lastUpdated: number | null;
    messages: MessageType[];
    keyboard: {
        options: string[];
    } | null;
};
type MessagePayload = {
    id: string;
    content: string;
    session_id: string;
    headers?: Record<string, unknown>;
    bot_token: string;
    query_params?: Record<string, string>;
    pathParams: Record<string, string>;
    language?: LangType;
    user?: {
        email?: string;
        name?: string;
        phone?: string;
        avatar?: string;
        customData?: Record<string, string>;
    };
};
type HookState = "loading" | "error" | "idle";
interface SendMessageInput extends Record<string, unknown> {
    content: {
        text: string;
    };
    headers?: Record<string, unknown>;
    user?: Record<string, unknown>;
    query_params?: Record<string, string>;
    PathParams?: Record<string, string>;
    id?: string;
    language?: useChatOptions['language'];
}
interface HookSettings {
    persistSession?: boolean;
    useSoundEffects?: boolean;
}
declare function useAbstractChat({ apiUrl, socketUrl, botToken, defaultHookSettings, onSessionDestroy, headers, queryParams, pathParams, userData, language, }: useChatOptions): UseAbstractchatReturnType;
interface InitialData {
    logo: string;
    faq: [];
    initial_questions: string[];
    history: MessageType[];
}
interface UseAbstractchatReturnType {
    version: string;
    state: ChatState;
    session: ChatSessionType | null;
    isSessionClosed: boolean;
    recreateSession: () => void;
    clearSession: () => void;
    sendMessage: (input: SendMessageInput) => Promise<MessagePayload | null>;
    noMessages: boolean;
    info: ReactNode;
    hookState: HookState;
    initialData: InitialData | null;
    settings: HookSettings | null;
    setSettings: (data: NonNullable<Partial<HookSettings>>) => void;
    axiosInstance: AxiosInstance;
    handleKeyboard: (option: string) => void;
}
export { useAbstractChat, type SendMessageInput, type HookState, type UseAbstractchatReturnType };
