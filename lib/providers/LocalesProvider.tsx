import { type LangType, getStr } from "@lib/locales";
import React from "react";
import { createSafeContext } from "../utils/create-safe-context";
import { useConfigData } from "./ConfigDataProvider";

const [useLang, SafeLanguageProvider] = createSafeContext<{
  get: (key: string) => string;
  lang: LangType;
}>();

function LanguageProvider({ children }: { children: React.ReactNode }) {
  const config = useConfigData();
  return (
    <SafeLanguageProvider
      value={{
        get: (key: string) => getStr(key, config.language ?? "en"),
        lang: config.language ?? "en",
      }}
    >
      {children}
    </SafeLanguageProvider>
  );
}
export { LanguageProvider, useLang };
