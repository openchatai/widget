import type { LangType } from "@lib/locales";
import React from "react";
import type { ComponentType } from ".";

export type WidgetOptions = {
  token: string;
  headers?: Record<string, string>;
  queryParams?: Record<string, string>;
  pathParams?: Record<string, string>;
  initialMessages: string[];
  triggerSelector?: string;
  apiUrl?: string;
  settings?: {
    persistSession?: boolean;
    useSoundEffects?: boolean;
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
  user?: {
    name?: string;
    email?: string;
    phone?: string;
    customData?: Record<string, string>;
    avatarUrl?: string;
  };
  bot?: {
    name?: string;
    avatarUrl?: string;
  };
  components?: ComponentType[];
};
