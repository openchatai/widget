import { CoreOptions } from "../types";

const DEFAULT_SOUND_EFFECTS = {
    messageArrived: "https://cloud.opencopilot.so/sfx/notification3.mp3"
};

const DEFAULT_THEME = {
    primaryColor: "hsl(211,65%,59%)",
    triggerOffset: "20px"
};

export type NormalizedConfig = Required<Omit<CoreOptions, 'contactToken'>> & {
    contactToken: string | undefined | null;
    soundEffectFiles: {
        messageArrived: string;
    };
    theme: {
        primaryColor: string;
        triggerOffset: string;
    };
    settings: {
        persistSession: boolean;
        useSoundEffects: boolean;
    };
};

export type ConfigInstance = {
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

const MIN_POLLING_INTERVAL = 1000 * 3;

export function createConfig(options: CoreOptions): ConfigInstance {
    if (!options.token) {
        throw new Error("Token is required");
    }

    if (options.pollingInterval && options.pollingInterval < MIN_POLLING_INTERVAL) {
        throw new Error("Polling interval must be at least 3 seconds");
    }

    const normalizedConfig: NormalizedConfig = {
        ...options,
        collectUserData: options.collectUserData ?? false,
        apiUrl: options.apiUrl ?? "https://api-v2.opencopilot.so/backend",
        socketUrl: options.socketUrl ?? "https://api-v2.opencopilot.so",
        pollingInterval: options.pollingInterval ?? 3000,
        headers: options.headers ?? {},
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
            primaryColor: options.theme?.primaryColor ?? DEFAULT_THEME.primaryColor,
            triggerOffset: options.theme?.triggerOffset ?? DEFAULT_THEME.triggerOffset
        },
        settings: {
            persistSession: options.settings?.persistSession ?? false,
            useSoundEffects: options.settings?.useSoundEffects ?? false
        },
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