import { useMemo } from 'react';
import { useWidget } from '@opencx/widget-react-headless';
import type { TranslationKeysU } from '../translation/translation.types';
import {
  getTranslation,
  isSupportedLocale,
  type Locale,
} from '../translation';

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
      : 'en';
    return {
      get: (key: TranslationKeysU) => getTranslation(key, language),
      lang: language,
    };
  }, [config.language]);

  return locale;
}
