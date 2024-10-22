import { WidgetOptions } from '../types';
import { ReactNode } from 'react';
declare const useConfigData: () => Omit<WidgetOptions, "language"> & {
    language: NonNullable<"en" | "ar" | "nl" | "fr" | "de" | "pt" | undefined>;
};
export declare function ConfigDataProvider({ children, data, }: {
    data: WidgetOptions;
    children: ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export { useConfigData };
