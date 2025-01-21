import type { AgentOrBotType } from "./agent-or-bot";

export interface WidgetConfig {
  token: string;
  apiUrl?: string;
  headers?: Record<string, string>;
  queryParams?: Record<string, string>;
  collectUserData?: boolean;
  debug?: boolean;
  initialMessages?: string[];
  language?: string;
  user?: {
    external_id?: string;
    name?: string;
    email?: string;
    phone?: string;
    customData?: Record<string, string>;
    avatarUrl?: string;
  };
  contactToken?: string;
  bot?: AgentOrBotType;
  soundEffectsUrls?: {
    messageArrived?: string;
  };
  theme?: {
    primaryColor?: string;
    // triggerOffset?: string;
  };
  settings?: {
    persistSession?: boolean;
    playSoundEffects?: boolean;
  };
  assets?: {
    organizationLogo?: string;
  };
}
