import { components } from '../sdk/schema';

export type Contact = components['schemas']['WidgetContactDto'];

export type ContactData = {
    email?: string;
    name?: string;
    phone?: string;
    avatar?: string;
    customData?: Record<string, string>;
};

export type ContactStorageData = {
    id: string;
    name: string;
    isAuthenticated: boolean;
    data?: ContactData;
    lastUpdated: string;
};