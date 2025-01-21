import { arLocale } from "./ar.locale";
import { deLocale } from "./de.locale";
import { enLocale } from "./en.locale";
import { frLocale } from "./fr.locale";
import { nlLocale } from "./nl.locale";
import { ptLocale } from "./pt.locale";
import type { TranslationKeysU } from "./translation.types";

const locales = {
  en: enLocale,
  ar: arLocale,
  nl: nlLocale,
  fr: frLocale,
  de: deLocale,
  pt: ptLocale,
} as const;

export const LOCALES = Object.keys(locales) as (keyof typeof locales)[];
export type Locale = (typeof LOCALES)[number];

export const isSupportedLocale = (
  lang: string | null | undefined,
): lang is Locale => {
  return LOCALES.includes(lang as Locale);
};

export function getTranslation(key: TranslationKeysU, lang: Locale): string {
  const locale = locales[lang];
  return locale ? locale[key] || "" : "";
}
