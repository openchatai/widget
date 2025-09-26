import type { WidgetConfig } from '../types/widget-config';
import { ArabicLanguage } from './ar';
import { GermanLanguage } from './de';
import { EnglishLanguage } from './en';
import { SpanishLanguage } from './es';
import { FrenchLanguage } from './fr';
import { DutchLanguage } from './nl';
import { PolishLanguage } from './pl';
import { PortugueseLanguage } from './pt';
import { TurkishLanguage } from './tr';

const languages = {
  en: EnglishLanguage,
  ar: ArabicLanguage,
  nl: DutchLanguage,
  fr: FrenchLanguage,
  de: GermanLanguage,
  pt: PortugueseLanguage,
  es: SpanishLanguage,
  tr: TurkishLanguage,
  pl: PolishLanguage,
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
