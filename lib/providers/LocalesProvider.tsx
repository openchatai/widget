import { type LangType, getStr } from "@lib/locales";
import React from "react";
import { createSafeContext } from "../utils/create-safe-context";
import { useConfigData } from "./ConfigDataProvider";

const [useLocale, SafeProvider] = createSafeContext<{
  get: (key: string, pfx?: string) => string;
  lang: LangType;
}>();

function LocaleProvider({ children }: { children: React.ReactNode }) {
  const config = useConfigData();

  return (
    <SafeProvider
      value={{
        get: (key: string, pfx) => getStr(key, config.language ?? "en") + (pfx ?? ""),
        lang: config.language,
      }}
    >
      {children}
    </SafeProvider>
  );
}
export { LocaleProvider, useLocale };
