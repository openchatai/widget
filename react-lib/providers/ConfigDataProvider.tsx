import React from "react";
import type { WidgetOptions, WidgetThemeOptions } from "@react/types";
import { type ReactNode, useMemo } from "react";
import { createSafeContext } from "../utils/create-safe-context";
import { LocaleProvider } from "./LocalesProvider";
import { useAxiosInstance, useSyncedState } from "@react/hooks";
import { ComponentRegistry } from "./componentRegistry";
import AgentIcon from "../static/agent-icon.png";
import { AgentType } from "@core/types";

const defaultTheme: WidgetThemeOptions = {
  headerStyle: "basic",
  primaryColor: "hsl(0,0%,0%)",
  triggerOffset: "20px"
}

function useNormalizeOptions(data: WidgetOptions) {
  return useMemo(() => {
    const soundEffectFiles = {
      messageArrived: "https://cloud.opencopilot.so/sfx/notification3.mp3",
      ...data.soundEffectFiles,
    };

    const theme = Object.assign({}, defaultTheme, data.theme ?? {})

    const bot: AgentType = {
      id: "555",
      is_ai: true,
      profile_picture: data.bot?.avatarUrl || AgentIcon,
      name: data.bot?.name || "Bot",
    }

    return {
      ...data,
      bot,
      apiUrl: data.apiUrl ?? "https://api-v2.opencopilot.so/backend",
      socketUrl: data.socketUrl ?? "https://api-v2.opencopilot.so",
      language: data.language ?? DEFAULT_LANG,
      botToken: data.token,
      headers: data.headers ?? {},
      pathParams: data.pathParams ?? {},
      queryParams: data.queryParams ?? {},
      user: data.user ?? {},
      theme,
      soundEffectFiles,
      collectUserData: data.collectUserData ?? false,
      defaultSettings: {
        persistSession: data.settings?.persistSession ?? false,
        useSoundEffects: data.settings?.useSoundEffects ?? false,
      },
    };
  }, [data]);
}
export type NormalizedWidgetOptions = ReturnType<typeof useNormalizeOptions>;
type WidgetSettings = {
  persistSession: boolean;
  useSoundEffects: boolean;
}

interface ConfigData extends ReturnType<typeof useNormalizeOptions> {
  http: ReturnType<typeof useAxiosInstance>;
  botToken: string;
  componentStore: ComponentRegistry;
  widgetSettings: WidgetSettings | null;
  setSettings: (settings: Partial<WidgetSettings>) => void;
  defaultSettings: WidgetSettings;
  soundEffectFiles: {
    messageArrived: string;
  }
}

const [useConfigData, ConfigDataSafeProvider] = createSafeContext<ConfigData>();

const DEFAULT_LANG = "en";

export function ConfigDataProvider({
  children,
  data,
}: {
  data: WidgetOptions;
  children: ReactNode;
}) {
  const componentStore = useMemo(
    () =>
      new ComponentRegistry({
        components: data.components,
      }),
    [data]
  );

  const _data = useNormalizeOptions(data);
  const http = useAxiosInstance({
    apiUrl: _data.apiUrl,
    botToken: _data.token,
  });


  const [widgetSettings, _setSettings] = useSyncedState("open_settings", _data.defaultSettings, "local");

  const setSettings = (_settings: Partial<WidgetSettings>) => {
    const merged = Object.assign({}, _data.defaultSettings, widgetSettings, _settings);
    _setSettings(merged);
  }

  return (
    <ConfigDataSafeProvider
      value={{ ..._data, http, componentStore, widgetSettings, setSettings }}
    >
      <LocaleProvider>{children}</LocaleProvider>
    </ConfigDataSafeProvider>
  );
}

export { useConfigData };
