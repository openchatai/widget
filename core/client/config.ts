import { CoreOptions } from "../types";

const DEFAULT_SOUND_EFFECTS = {
    messageArrived: "https://cloud.opencopilot.so/sfx/notification3.mp3"
};

const DEFAULT_THEME = {
    headerStyle: "basic" as const,
    primaryColor: "hsl(211,65%,59%)",
    triggerOffset: "20px"
};

type NormalizedConfig = Required<Omit<CoreOptions, 'contactToken'>> & {
    contactToken: string | undefined | null;
    soundEffectFiles: {
        messageArrived: string;
    };
    theme: {
        headerStyle: "compact" | "basic";
        primaryColor: string;
        triggerOffset: string;
    };
    settings: {
        persistSession: boolean;
        useSoundEffects: boolean;
    };
};

type ConfigInstance = {
    getConfig: () => NormalizedConfig;
    getApiConfig: () => {
        apiUrl: string;
        token: string;
        headers: Record<string, string>;
        queryParams: Record<string, string>;
        pathParams: Record<string, string>;
    };
    getBotConfig: () => NormalizedConfig['bot'];
    getThemeConfig: () => NormalizedConfig['theme'];
    getSettings: () => NormalizedConfig['settings'];
    getSoundEffects: () => NormalizedConfig['soundEffectFiles'];
    getUser: () => NormalizedConfig['user'];
    getLanguage: () => string;
    getDebugMode: () => boolean;
};

export function createConfig(options: CoreOptions): ConfigInstance {
    const normalizedConfig: NormalizedConfig = {
        ...options,
        apiUrl: options.apiUrl ?? "https://api-v2.opencopilot.so/backend",
        socketUrl: options.socketUrl ?? "https://api-v2.opencopilot.so",
        transport: options.transport ?? 'socket',
        pollingInterval: options.pollingInterval ?? 3000,
        headers: {
            ...(options.headers ?? {}),
            "X-Bot-Token": options.token,
        },
        queryParams: options.queryParams ?? {},
        pathParams: options.pathParams ?? {},
        bot: {
            name: options.bot?.name ?? "Bot",
            avatarUrl: options.bot?.avatarUrl,
            id: options.bot?.id ?? null,
            is_ai: options.bot?.is_ai ?? true
        },
        contactToken: options.contactToken,
        debug: options.debug ?? false,
        language: options.language ?? "en",
        user: options.user ?? {},
        soundEffectFiles: {
            messageArrived: options.soundEffectFiles?.messageArrived ?? DEFAULT_SOUND_EFFECTS.messageArrived
        },
        theme: {
            headerStyle: options.theme?.headerStyle ?? DEFAULT_THEME.headerStyle,
            primaryColor: options.theme?.primaryColor ?? DEFAULT_THEME.primaryColor,
            triggerOffset: options.theme?.triggerOffset ?? DEFAULT_THEME.triggerOffset
        },
        settings: {
            persistSession: options.settings?.persistSession ?? false,
            useSoundEffects: options.settings?.useSoundEffects ?? false
        }
    };

    return {
        getConfig: () => normalizedConfig,
        getApiConfig: () => ({
            apiUrl: normalizedConfig.apiUrl,
            token: normalizedConfig.token,
            headers: normalizedConfig.headers,
            queryParams: normalizedConfig.queryParams,
            pathParams: normalizedConfig.pathParams
        }),
        getBotConfig: () => normalizedConfig.bot,
        getThemeConfig: () => normalizedConfig.theme,
        getSettings: () => normalizedConfig.settings,
        getSoundEffects: () => normalizedConfig.soundEffectFiles,
        getUser: () => normalizedConfig.user,
        getLanguage: () => normalizedConfig.language,
        getDebugMode: () => normalizedConfig.debug
    };
} 