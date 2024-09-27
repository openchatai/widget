import { arLocale } from "./ar.locale";
import { deLocale } from "./de.locale.ts";
import { enLocale } from "./en.locale";
import { frLocale } from "./fr.locale.ts";
import { nlLocale } from "./nl.locale.ts";
import { ptLocale } from "./pt.locale.ts";

const locales = {
  en: enLocale,
  ar: arLocale,
  nl: nlLocale,
  fr: frLocale,
  de: deLocale,
  pt: ptLocale
};

export type LangType = keyof typeof locales;

export function getStr(key: string, lang: LangType): string {
  const locale = locales[lang];
  return locale ? locale[key] || "" : "";
}
