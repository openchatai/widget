import type { AgentOrBotType } from './agent-or-bot';

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
        avatarUrl?: string;
        customData?: Record<string, string>;
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
  /**
   * Your organization's widget token.
   * Can be found in the dashboard in the web widget page.
   */
  token: string;
  /**
   * The language of the widget.
   * Translations are available in the default non-headless widget.
   * Check available translations in `src/designs/translation`
   * @default en
   */
  language?: string;
  /**
   * A name and an avatar for the bot.
   */
  bot?: Pick<AgentOrBotType, 'name' | 'avatar'>;
  theme?: {
    primaryColor?: string;
  };
  assets?: {
    organizationLogo?: string;
  };
  /**
   * Initial messages that the contact sees in a new chat session.
   * These messages will disappear once the contact sends their first message.
   */
  initialMessages?: string[];
  /**
   * If turned on, the widget will have a login-like screen to collect user's name and email.
   * A non-verified contact will be created based on the provided information.
   * @default false
   */
  collectUserData?: boolean;
  /**
   * Provide initial values for the `name` and `email` inputs in the welcome screen.
   * For this setting to take effect, `collectUserData` must be set to `true`.
   * @default undefined
   */
  prefillUserData?: {
    name?: string;
    email?: string;
  };
  /**
   * Extra data collection fields besides `name` and `email`.
   * For this setting to take effect, `collectUserData` must be set to `true`.
   *
   * Not to be confused with `WidgetConfig.user.data.customData`,
   * the purpose of `extraDataCollectionFields` is to provide context to the session,
   * the data collected will be prepended in the first contact message in a session.
   *
   * @default undefined
   */
  extraDataCollectionFields?: string[];
  /**
   * Verified or non-verified contact data.
   * To know more, check the README
   * @default undefined
   */
  user?: UserConfig;
  /**
   * Custom text content to override the defaults in the default widget.
   */
  textContent?: {
    welcomeScreen?: {
      title?: string;
      description?: string;
    };
  };
  /**
   * Customize the router behavior.
   */
  router?: {
    /**
     * If true, the router will navigate to the `chat` screen instead of `sessions` screen if the contact has no previous sessions.
     * @default true
     */
    goToChatIfNoSessions?: boolean;
  };
  /**
   * Headers to be sent with each send-message request from the widget.
   * These headers will be sent with each AI action (AI tools) that the LLM can call.
   * This is useful if your AI actions require authentication specific to each contact.
   * @default undefined
   */
  headers?: Record<string, string>;
  /**
   * Query params to be sent with each send-message request from the widget.
   * These query params will be sent with each AI action (AI tools) that the LLM can call.
   * This is useful if you want to send extra information with each AI action.
   * @default undefined
   */
  queryParams?: Record<string, string>;
  /**
   * Dynamic context to be sent with each send-message request from the widget.
   * Useful if you want to send data regarding the current page the user is viewing.
   */
  context?: Record<string, unknown>;
  /**
   * An apiUrl to override production backend.
   * This is for us to test the widget locally, you don't need to play with this option 😊.
   * @default https://api.open.cx
   */
  apiUrl?: string;
}
