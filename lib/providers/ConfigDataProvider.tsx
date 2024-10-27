import type { MakeKeysNotNullable, WidgetOptions } from "@lib/types";
import { type ReactNode, useMemo } from "react";
import { createSafeContext } from "../utils/create-safe-context";
import { LocaleProvider } from "./LocalesProvider";
import { useAxiosInstance, useSyncedState } from "@lib/hooks";
import { PreludeData } from "@lib/utils";
import useSWR, { SWRResponse } from "swr";
import { ComponentRegistry } from "./componentRegistry";

type NonNullableSomeConfigKeys = MakeKeysNotNullable<
  WidgetOptions,
  "language" | "apiUrl" | "socketUrl" | "headers" | "pathParams" | "queryParams" | "soundEffectFiles"
>;
type WidgetSettings = {
  persistSession: boolean;
  useSoundEffects: boolean;
}
interface ConfigData extends NonNullableSomeConfigKeys {
  http: ReturnType<typeof useAxiosInstance>;
  botToken: string;
  preludeSWR: SWRResponse<PreludeData | undefined, any>;
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

  const _data = useMemo(() => {
    const soundEffectFiles = {
      messageDelivered: "https://cloud.opencopilot.so/sfx/notification1.mp3",
      messageArrived: "https://cloud.opencopilot.so/sfx/notification2.mp3",
      ticketResolved: "https://cloud.opencopilot.so/sfx/notification3.mp3",
      ...data.soundEffectFiles,
    };
    return {
      ...data,
      apiUrl: data.apiUrl ?? "https://api-v2.opencopilot.so/backend",
      socketUrl: data.socketUrl ?? "https://api-v2.opencopilot.so",
      language: data.language ?? DEFAULT_LANG,
      botToken: data.token,
      headers: data.headers ?? {},
      pathParams: data.pathParams ?? {},
      queryParams: data.queryParams ?? {},
      soundEffectFiles,
      defaultSettings: {
        persistSession: data.settings?.persistSession ?? false,
        useSoundEffects: data.settings?.useSoundEffects ?? false,
      }
    };
  }, [data]);

  const http = useAxiosInstance({
    apiUrl: _data.apiUrl,
    botToken: _data.token,
  });

  const preludeSWR = useSWR([http.options], async () => {
    const { data } = await http.apis.fetchPreludeData();
    return data;
  });

  const [widgetSettings, _setSettings] = useSyncedState("open_settings", _data.defaultSettings, "local");

  const setSettings = (_settings: Partial<WidgetSettings>) => {
    const merged = Object.assign({}, _data.defaultSettings, widgetSettings, _settings);
    _setSettings(merged);
  }

  return (
    <ConfigDataSafeProvider
      value={{ ..._data, http, preludeSWR, componentStore, widgetSettings, setSettings }}
    >
      <LocaleProvider>{children}</LocaleProvider>
    </ConfigDataSafeProvider>
  );
}

export { useConfigData };
