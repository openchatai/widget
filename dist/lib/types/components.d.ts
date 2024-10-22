import { default as React } from 'react';
import { BotMessageType } from './messages';
export type ComponentProps<TData> = BotMessageType<TData>;
export type ComponentType = {
    key: string;
    component: React.ElementType;
};
export type OptionsType = {
    components?: ComponentType[];
};
