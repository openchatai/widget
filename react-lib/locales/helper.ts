import { arLocale } from "./ar.locale";
import { deLocale } from "./de.locale";
import { TranslationKeysType, enLocale } from "./en.locale";
import { frLocale } from "./fr.locale";
import { nlLocale } from "./nl.locale";
import { ptLocale } from "./pt.locale";

const locales = {
  en: enLocale,
  ar: arLocale,
  nl: nlLocale,
  fr: frLocale,
  de: deLocale,
  pt: ptLocale
} as const;

export type LangType = keyof typeof locales;

export function getStr(key: TranslationKeysType, lang: LangType): string {
  const locale = locales[lang];
  return locale ? locale[key] || "" : "";
}
