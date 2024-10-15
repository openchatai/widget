import type { LangType } from "@lib/locales";
import React from "react";
import type { ComponentType } from ".";

export type UserObject = {
  external_id?: string;
  name?: string;
  email?: string;
  phone?: string;
  customData?: Record<string, string>;
  avatarUrl?: string;
}

export type WidgetOptions = {
  token: string;
  theme?: "basic" | "default",
  headers?: Record<string, string>;
  queryParams?: Record<string, string>;
  pathParams?: Record<string, string>;
  initialMessages: string[];
  triggerSelector?: string;
  apiUrl?: string;
  defaultSettings?: {
    playSoundEffects?: boolean;
    keepUserData?: boolean
  },
  conversations?: {
    /**
     * note that opened sessions will be grapped as well regardless of this setting.
     * so this setting is exclusive fot the closed sessions.
     */
    maxFetchedSessions?: number;
  },
  socketUrl?: string;
  defaultOpen?: boolean;
  debug?: boolean;
  language?: LangType;
  warnBeforeClose?: boolean;
  onClose?: () => void;
  organizationName?: string;
  containerProps?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >;
  user?: UserObject
  bot?: {
    name?: string;
    avatarUrl?: string;
  };
  components?: ComponentType[];
};
