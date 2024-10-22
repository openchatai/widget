import type { MakeKeysNotNullable, WidgetOptions } from "@lib/types";
import { type ReactNode, useMemo } from "react";
import { createSafeContext } from "../utils/create-safe-context";
import { LocaleProvider } from "./LocalesProvider";
import { useAxiosInstance } from "@lib/hooks";
import { PreludeData } from "@lib/utils";
import useSWR, { SWRResponse } from "swr";

type NonNullableSomeConfigKeys = MakeKeysNotNullable<WidgetOptions, "language" | "apiUrl" | "socketUrl">

interface ConfigData extends NonNullableSomeConfigKeys {
  http: ReturnType<typeof useAxiosInstance>;
  botToken: string;
  preludeSWR: SWRResponse<PreludeData | undefined, any>
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

  const _data = useMemo(() => {
    return {
      ...data,
      apiUrl: data.apiUrl ?? "https://api-v2.opencopilot.so/backend",
      socketUrl: data.socketUrl ?? "https://api-v2.opencopilot.so",
      language: data.language ?? DEFAULT_LANG,
      botToken: data.token
    };
  }, [data]);

  const http = useAxiosInstance({ apiUrl: _data.apiUrl, botToken: _data.token });

  const preludeSWR = useSWR([http.options], async () => {
    const { data } = await http.apis.fetchPreludeData();
    return data
  });

  return (
    <ConfigDataSafeProvider value={{ ..._data, http, preludeSWR }}>
      <LocaleProvider>
        {children}
      </LocaleProvider>
    </ConfigDataSafeProvider>
  );
}

export { useConfigData };
