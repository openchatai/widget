import { TranslationKeysType } from './en.locale';
declare const locales: {
    readonly en: {
        ok: string;
        yes: string;
        no: string;
        agree: string;
        cancel: string;
        "yes-exit": string;
        "yes-reset": string;
        "no-cancel": string;
        "are-you-sure": string;
        recording: string;
        "thank-you": string;
        "sorry-try-again": string;
        "error-occurred": string;
        "please-try-again": string;
        "write-a-message": string;
        "send-message": string;
        connected: string;
        connecting: string;
        reconnecting: string;
        reconnected: string;
        disconnecting: string;
        disconnected: string;
        error: string;
        "persist-session": string;
        settings: string;
        close: string;
        help: string;
        chat: string;
        send: string;
        copy: string;
        copied: string;
        "sound-effects": string;
        language: string;
        select: string;
        agent: string;
        user: string;
        bot: string;
        "reset-conversation-confirm": string;
        "close-widget": string;
        "got-any-questions": string;
        "typical-response-time": string;
        "session-closed-lead": string;
    };
    readonly ar: import('..').TranslatableMessages;
    readonly nl: import('..').TranslatableMessages;
    readonly fr: import('..').TranslatableMessages;
    readonly de: import('..').TranslatableMessages;
    readonly pt: import('..').TranslatableMessages;
};
export type LangType = keyof typeof locales;
export declare function getStr(key: TranslationKeysType, lang: LangType): string;
export {};