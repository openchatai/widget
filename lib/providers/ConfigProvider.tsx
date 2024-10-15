import { useAxiosInstance, useSyncedState } from "@lib/hooks";
import type { MakeKeysNotNullable, PrelaudeData, UserObject, WidgetOptions } from "@lib/types";
import { type ReactNode, useMemo } from "react";
import useSWR, { SWRResponse } from "swr";
import { createSafeContext } from "../utils/create-safe-context";
import { LocaleProvider } from "./LocalesProvider";

type Settings = {
  playSoundEffects: boolean;
  keepUserData: boolean;
}
type NotNullableSomeConfigKeys = MakeKeysNotNullable<WidgetOptions, "language" | "apiUrl" | "socketUrl">

type PrelaudeSWRType = SWRResponse<PrelaudeData | null, any, any>

interface ConfigDataProviderValue extends Omit<NotNullableSomeConfigKeys, "defaultSettings"> {
  settings: {
    playSoundEffects: boolean;
    keepUserData: boolean;
  } | null;
  setSettings: (settings: Settings) => void;
  apis: ReturnType<typeof useAxiosInstance>;
  userData: UserObject;
  botToken: string;
  prelaudeSWR: PrelaudeSWRType;
}

const [useConfigData, ConfigDataSafeProvider] =
  createSafeContext<ConfigDataProviderValue>();

const DEFAULT_LANG = "en";

export function ConfigDataProvider({
  children,
  data,
}: {
  data: WidgetOptions;
  children: ReactNode;
}) {

  const [settings, setSettings] = useSyncedState<Settings>(
    "[SETTINGS]:[OPEN]",
    {
      playSoundEffects: data.defaultSettings?.playSoundEffects ?? false,
      keepUserData: data.defaultSettings?.keepUserData ?? false,
    },
    "local",
  );

  const _data = useMemo(() => {
    return {
      ...data,
      language: data.language ?? DEFAULT_LANG,
      botToken: data.token,
      apiUrl: data.apiUrl ?? "https://api-v2.opencopilot.so/backend",
      socketUrl: data.socketUrl ?? "https://api-v2.opencopilot.so",
      userData: data.user ?? {},
      settings,
      setSettings
    };
  }, [data, settings, setSettings]);

  const apis = useAxiosInstance({
    apiUrl: _data.apiUrl,
    botToken: _data.botToken,
  });

  const prelaudeSWR = useSWR([apis.options], async () => {
    const resp = await apis.fetchPrelaudeData();
    if (resp.data) return resp.data
    return null
  })

  return (
    <ConfigDataSafeProvider value={{ ..._data, apis, prelaudeSWR }}>
      <LocaleProvider>
        {children}
      </LocaleProvider>
    </ConfigDataSafeProvider>
  );
}

export { useConfigData };
