import type { MakeKeysNotNullable, WidgetOptions } from "@lib/types";
import { type ReactNode, useMemo } from "react";
import { createSafeContext } from "../utils/create-safe-context";
import { LocaleProvider } from "./LocalesProvider";

const [useConfigData, ConfigDataSafeProvider] =
  createSafeContext<MakeKeysNotNullable<WidgetOptions, "language">>();

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
      language: data.language ?? DEFAULT_LANG,
    };
  }, [data]);

  return (
    <ConfigDataSafeProvider value={_data}>
      <LocaleProvider>
        {children}
      </LocaleProvider>
    </ConfigDataSafeProvider>
  );
}

export { useConfigData };
