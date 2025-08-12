import { arLanguage } from './ar';
import { deLanguage } from './de';
import { enLanguage } from './en';
import { frLanguage } from './fr';
import { nlLanguage } from './nl';
import { ptLanguage } from './pt';
import { esLanguage } from './es';
import { trLanguage } from './tr';
import type { TranslationKeysU } from './translation.types';

const languages = {
  en: enLanguage,
  ar: arLanguage,
  nl: nlLanguage,
  fr: frLanguage,
  de: deLanguage,
  pt: ptLanguage,
  es: esLanguage,
  tr: trLanguage,
} as const;

export const LANGUAGES = Object.keys(languages) as (keyof typeof languages)[];
export type Language = (typeof LANGUAGES)[number];

export function isSupportedLanguage(
  lang: string | null | undefined,
): lang is Language {
  return LANGUAGES.includes(lang as Language);
}

export function getTranslation(key: TranslationKeysU, lang: Language): string {
  const language = languages[lang];
  return language ? language[key] || '' : '';
}
