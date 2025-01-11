import { Platform, isStorageAvailable } from "@core/platform";
import { CoreOptions } from "../types";
import { PubSub } from "../types/pub-sub";

const DEFAULT_SOUND_EFFECTS = {
    messageArrived: "https://cloud.opencopilot.so/sfx/notification3.mp3"
};

const DEFAULT_THEME = {
    primaryColor: "hsl(211,65%,59%)",
    triggerOffset: "20px"
};

export type WidgetSettings = {
    persistSession: boolean;
    useSoundEffects: boolean;
};

const DEFAULT_SETTINGS: WidgetSettings = {
    persistSession: false,
    useSoundEffects: false
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
    settings: WidgetSettings;
};

const MIN_POLLING_INTERVAL = 1000 * 3;

function createSettingsManager(
    initialSettings: NormalizedConfig['settings'],
    platform: Platform,
    token: string
) {
    const logger = platform.logger;
    const storage = platform.storage;
    const storageKey = `${token}:settings`;
    const settingsState = new PubSub<WidgetSettings>(initialSettings);

    async function restoreSettings() {
        if (!storage || !isStorageAvailable(storage)) return;
        try {
            logger?.debug('Attempting to restore settings from storage');
            const storedSettings = await storage.getItem(storageKey);
            if (storedSettings) {
                const settings = JSON.parse(storedSettings) as NormalizedConfig['settings'];
                logger?.debug('Settings restored from storage', settings);
                settingsState.setState({
                    ...initialSettings,
                    ...settings
                });
            }
        } catch (error) {
            logger?.error('Error restoring settings:', error);
        }
    }

    async function persistSettings(settings: WidgetSettings) {
        if (!storage || !isStorageAvailable(storage)) return;
        try {
            await storage.setItem(storageKey, JSON.stringify(settings));
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
        updateSettings,
        settingsState
    };
}

export function createConfig(options: CoreOptions, platform: Platform) {
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
            persistSession: options.settings?.persistSession ?? DEFAULT_SETTINGS.persistSession,
            useSoundEffects: options.settings?.useSoundEffects ?? DEFAULT_SETTINGS.useSoundEffects
        },
    };

    const { settingsState, updateSettings } = createSettingsManager(normalizedConfig.settings, platform, normalizedConfig.token);

    return {
        getConfig: () => ({
            ...normalizedConfig,
            settings: settingsState.getState()
        }),
        getBotConfig: () => normalizedConfig.bot,
        getThemeConfig: () => normalizedConfig.theme,
        getSettings: () => settingsState.getState(),
        getSoundEffects: () => normalizedConfig.soundEffectFiles,
        getUser: () => normalizedConfig.user,
        getLanguage: () => normalizedConfig.language,
        getDebugMode: () => normalizedConfig.debug,
        updateSettings,
        settingsState
    };
}

export type ConfigInstance = ReturnType<typeof createConfig>;