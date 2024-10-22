import { LangType } from '../locales';
import { TranslationKeysType } from '@lib/locales/en.locale';
import { default as React } from 'react';
declare const useLocale: () => {
    get: (key: TranslationKeysType, pfx?: string) => string;
    lang: LangType;
};
declare function LocaleProvider({ children }: {
    children: React.ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export { LocaleProvider, useLocale };
