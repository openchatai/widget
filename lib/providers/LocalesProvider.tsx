import { type LangType, getStr } from "@lib/locales";
import { TranslationKeysType } from "@lib/locales/en.locale";
import React from "react";
import { createSafeContext } from "../utils/create-safe-context";
import { useConfigData } from "./ConfigProvider";

const [useLocale, SafeProvider] = createSafeContext<{
  get: (key: TranslationKeysType, pfx?: string) => string;
  lang: LangType;
}>();

function LocaleProvider({ children }: { children: React.ReactNode }) {
  const config = useConfigData();

  return (
    <SafeProvider
      value={{
        get: (key: TranslationKeysType, pfx) => getStr(key, config.language ?? "en") + (pfx ?? ""),
        lang: config.language,
      }}
    >
      {children}
    </SafeProvider>
  );
}
export { LocaleProvider, useLocale };
