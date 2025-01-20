import { useMemo } from "react";
import { TranslationKeysU } from "src/designs/translation/translation.types";
import {
  getTranslation,
  isSupportedLocale,
  Locale,
} from "src/designs/translation";
import { useWidget } from "src/headless/react";

export function useLocale() {
  const {
    widgetCtx: { config },
  } = useWidget();

  const locale = useMemo<{
    get: (key: TranslationKeysU) => string;
    lang: Locale;
  }>(() => {
    const language: Locale = isSupportedLocale(config.language)
      ? config.language
      : "en";
    return {
      get: (key: TranslationKeysU) => getTranslation(key, language),
      lang: language,
    };
  }, [config.language]);

  return locale;
}
