import type { WidgetConfig } from '../types/widget-config';
import { ArabicLanguage } from './ar';
import { DanishLanguage } from './da';
import { GreekLanguage } from './el';
import { GermanLanguage } from './de';
import { EnglishLanguage } from './en';
import { SpanishLanguage } from './es';
import { FinnishLanguage } from './fi';
import { FrenchLanguage } from './fr';
import { ItalianLanguage } from './it';
import { DutchLanguage } from './nl';
import { NorwegianLanguage } from './no';
import { PolishLanguage } from './pl';
import { PortugueseLanguage } from './pt';
import { RomanianLanguage } from './ro';
import { SwedishLanguage } from './sv';
import { RussianLanguage } from './ru';
import { TurkishLanguage } from './tr';

const languages = {
  ar: ArabicLanguage,
  da: DanishLanguage,
  de: GermanLanguage,
  el: GreekLanguage,
  en: EnglishLanguage,
  es: SpanishLanguage,
  fi: FinnishLanguage,
  fr: FrenchLanguage,
  it: ItalianLanguage,
  nl: DutchLanguage,
  no: NorwegianLanguage,
  pl: PolishLanguage,
  pt: PortugueseLanguage,
  ro: RomanianLanguage,
  ru: RussianLanguage,
  sv: SwedishLanguage,
  tr: TurkishLanguage,
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
