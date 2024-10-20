import type { LangType } from "@lib/locales";
import type { ComponentType } from ".";
import { WidgetLogger } from "@lib/utils/logger";

export type UserObject = {
  external_id?: string;
  name?: string;
  email?: string;
  phone?: string;
  customData?: Record<string, string>;
  avatarUrl?: string;
}

export type WidgetOptions = {
  initialMessages: string[];
  logger?: WidgetLogger;
  headers?: Record<string, string>;
  queryParams?: Record<string, string>;
  pathParams?: Record<string, string>;
  
  defaultSettings?: {
    playSoundEffects?: boolean;
    keepUserData?: boolean
  },
  
  socketUrl?: string;
  apiUrl?: string;
  token: string;
  
  defaultOpen?: boolean;
  
  language?: LangType;
  
  organizationName?: string;
  
  /**
   * the user data known to the tenant.
   * @default {}
   */
  user?: UserObject;

  bot?: {
    name?: string;
    avatarUrl?: string;
  };
  
  components?: ComponentType[];
  
  /**
   * no api requests, or socket connections will be made.
   * @default false
   */
  preview?: boolean;
  /**
   * to show fallback component when the key is not found.
   * useful for custom components
   * @default false
   */
  debug?: boolean;
};
