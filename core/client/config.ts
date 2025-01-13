import { isStorageAvailable, Platform } from "@core/platform";
import { CoreOptions, createPubSub, PubSub } from "../types";

const DEFAULT_SOUND_EFFECTS = {
    messageArrived: "https://cloud.opencopilot.so/sfx/notification3.mp3"
};
/**
 * exclusive for web client
 */
const DEFAULT_THEME = {
    primaryColor: "hsl(211,65%,59%)",
    triggerOffset: "20px"
};

const DEFAULT_SETTINGS = {
    persistSession: false,
    useSoundEffects: false
};

export type NormalizedConfig = Required<Omit<CoreOptions, 'contactToken' | 'initialMessages'>> & {
    contactToken: string | undefined | null;
    initialMessages: string[];
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
    assets: {
        organizationLogo: string;
    };
};

export type ConfigInstance = {
    config: NormalizedConfig;
    settingsState: PubSub<WidgetSettings>;
    updateSettings: (newSettings: Partial<WidgetSettings>) => void;
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

export type WidgetSettings = {
    persistSession: boolean;
    useSoundEffects: boolean;
};

function createSettingsManager(initialSettings: NormalizedConfig['settings'], platform: Platform, settingsStorageKey: string) {
    const logger = platform.logger;
    const storage = platform.storage;
    const settingsState = createPubSub<WidgetSettings>(initialSettings ?? DEFAULT_SETTINGS);

    async function restoreSettings() {
        if (!storage || !isStorageAvailable(storage)) return;
        try {
            logger?.debug('Attempting to restore settings from storage');
            const storedSettings = await storage.getItem(settingsStorageKey);
            if (storedSettings) {
                const settings = JSON.parse(storedSettings) as WidgetSettings;
                logger?.debug('Settings restored from storage', settings);
                settingsState.setState(settings);
            }
        } catch (error) {
            logger?.error('Error restoring settings:', error);
        }
    }

    async function persistSettings(settings: WidgetSettings) {
        if (!storage || !isStorageAvailable(storage)) return;
        try {
            await storage.setItem(settingsStorageKey, JSON.stringify(settings));
            logger?.debug('Settings persisted to storage', settings);
        } catch (error) {
            logger?.error('Error persisting settings:', error);
        }
    }

    function updateSettings(newSettings: Partial<WidgetSettings>) {
        const currentSettings = settingsState.getState();
        const mergedSettings = {
            ...currentSettings,
            ...newSettings
        };

        settingsState.setState(mergedSettings);
        persistSettings(mergedSettings);
    }

    // Initialize settings
    restoreSettings();
    return {
        settingsState,
        restoreSettings,
        updateSettings
    }
}

export function createConfig(options: CoreOptions, platform: Platform): ConfigInstance {
    if (!options.token) {
        throw new Error("Token is required");
    }

    if (options.pollingInterval && options.pollingInterval < MIN_POLLING_INTERVAL) {
        throw new Error("Polling interval must be at least 3 seconds");
    }

    const normalizedConfig: NormalizedConfig = {
        ...options,
        collectUserData: options.collectUserData ?? false,
        initialMessages: options.initialMessages ?? [],
        apiUrl: options.apiUrl ?? "https://api.open.cx/backend",
        pollingInterval: options.pollingInterval ?? 3000,
        headers: options.headers ?? {},
        queryParams: options.queryParams ?? {},
        pathParams: options.pathParams ?? {},
        bot: {
            name: options.bot?.name ?? "Bot",
            avatar: options.bot?.avatar ?? null,
            id: options.bot?.id ?? null,
            isAi: options.bot?.isAi ?? true
        },
        contactToken: options.contactToken,
        debug: options.debug ?? false,
        language: options.language ?? "en",
        user: options.user ?? {},
        soundEffectFiles: Object.assign({}, DEFAULT_SOUND_EFFECTS, options.soundEffectFiles),
        theme: Object.assign({}, DEFAULT_THEME, options.theme),
        settings: Object.assign({}, DEFAULT_SETTINGS, options.settings),
        assets: {
            organizationLogo: options.assets?.organizationLogo ?? ""
        }
    };
    const settingsStorageKey = `${normalizedConfig.token}:settings`;
    const { settingsState, updateSettings } = createSettingsManager(normalizedConfig.settings, platform, settingsStorageKey);

    return {
        config: normalizedConfig,
        settingsState,
        updateSettings,
        getConfig: () => ({
            ...normalizedConfig,
            settings: settingsState.getState()
        }),
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