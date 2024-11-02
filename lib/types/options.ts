import type { LangType } from "@lib/locales";
import React from "react";
import type { ComponentType } from "./components";

export type UserObject = {
  external_id?: string;
  name?: string;
  email?: string;
  phone?: string;
  customData?: Record<string, string>;
  avatarUrl?: string;
}

export interface WidgetThemeOptions {
  headerStyle: "compact" | "basic";
  primaryColor: string;
  hideInfoBar: boolean;
  triggerOffset: string;
}

export type WidgetOptions = {
  token: string;
  headers?: Record<string, string>;
  queryParams?: Record<string, string>;
  pathParams?: Record<string, string>;
  initialMessages: string[];
  apiUrl?: string;
  theme?: Partial<WidgetThemeOptions>;
  settings?: {
    persistSession?: boolean;
    useSoundEffects?: boolean;
  },
  collectUserData?: boolean;
  soundEffectFiles?: {
    messageArrived?: string;
  },
  socketUrl?: string;
  debug?: boolean;
  language?: LangType;
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
