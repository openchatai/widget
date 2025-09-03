import { arLanguage } from './ar';
import { deLanguage } from './de';
import { enLanguage } from './en';
import { frLanguage } from './fr';
import { nlLanguage } from './nl';
import { ptLanguage } from './pt';
import { esLanguage } from './es';
import { trLanguage } from './tr';
import type { WidgetConfig } from '../types/widget-config';

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

export function getTranslation(
  key: TranslationKeyU,
  lang: Language,
  overrides: WidgetConfig['translationOverrides'],
): string {
  return overrides?.[lang]?.[key] || languages[lang][key] || '';
}

export type TranslationInterface = {
  i_need_more_help: string;
  this_was_helpful: string;
  write_a_message_placeholder: string;
  your_issue_has_been_resolved: string;
  new_conversation: string;
  back_to_conversations: string;
  closed_conversations: string;
  no_conversations_yet: string;
  welcome_screen_title: string;
  welcome_screen_description: string;
  your_name_placeholder: string;
  your_email_placeholder: string;
  optional: string;
  start_chat_button: string;
  start_chat_button_loading: string;
};
export type TranslationKeyU = keyof TranslationInterface;
