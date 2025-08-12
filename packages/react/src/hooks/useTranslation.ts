import { useConfig, useDocumentDir } from '@opencx/widget-react-headless';
import { useMemo } from 'react';
import { getTranslation, isSupportedLocale, type Locale } from '../translation';
import type { TranslationKeysU } from '../translation/translation.types';

export function useTranslation() {
  const { dir: hostDocumentDir } = useDocumentDir();
  const config = useConfig();

  const locale = useMemo(() => {
    const language: Locale = isSupportedLocale(config.language)
      ? config.language
      : 'en';
    return {
      get: (key: TranslationKeysU) => getTranslation(key, language),
      language: language,
      dir: language === 'ar',
      hostDocumentDir,
    };
  }, [config.language]);

  return locale;
}
