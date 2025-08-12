import { useConfig, useDocumentDir } from '@opencx/widget-react-headless';
import { useMemo } from 'react';
import {
  getTranslation,
  isSupportedLanguage,
  type Language,
} from '../translation';
import type { TranslationKeysU } from '../translation/translation.types';

export function useTranslation() {
  const { dir: hostDocumentDir } = useDocumentDir();
  const config = useConfig();

  return useMemo(() => {
    const language: Language = isSupportedLanguage(config.language)
      ? config.language
      : 'en';
    return {
      t: (key: TranslationKeysU) => getTranslation(key, language),
      language: language,
      dir: language === 'ar' ? 'rtl' : 'ltr',
      hostDocumentDir,
    };
  }, [config.language, hostDocumentDir]);
}
