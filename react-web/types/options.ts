import { CoreOptions } from "@core/types";
import { LangType } from "@react/core-integration/locales";

export type UserObject = {
  external_id?: string;
  name?: string;
  email?: string;
  phone?: string;
  customData?: Record<string, string>;
  avatarUrl?: string;
};

export interface WidgetThemeOptions {
  primaryColor: string;
  triggerOffset: string;
}

export interface WidgetOptions extends CoreOptions {
  language?: LangType;
}
