import type { AgentOrBotType } from "./agent-or-bot";

type UserBaseConfig =
  | {
      token: string;
      data?: never;
    }
  | {
      token?: never;
      data?: {
        name?: string;
        email?: string;
        phone?: string;
        customData?: Record<string, string>;
        avatarUrl?: string;
      };
    };

export type UserConfig = UserBaseConfig & {
  /**
   * An external ID is useful to scope the sessions of a single user based on workspace.
   * For example, if a user uses one email for multiple accounts (organizations) in your application.
   */
  externalId?: string;
};

export interface WidgetConfig {
  token: string;
  apiUrl?: string;
  headers?: Record<string, string>;
  queryParams?: Record<string, string>;
  collectUserData?: boolean;
  debug?: boolean;
  initialMessages?: string[];
  language?: string;
  user?: UserConfig;
  bot?: AgentOrBotType;
  theme?: {
    primaryColor?: string;
  };
  assets?: {
    organizationLogo?: string;
  };
}
