import type { AgentOrBotType } from './agent-or-bot';

// The enum is imported so the `@link` in the jsdoc works
// eslint-disable-next-line unused-imports/no-unused-imports
import { OpenCxComponentName } from './component-name.enum';

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

type ThemeOptions = {
  primaryColor?: string;
  widgetTrigger?: {
    zIndex?: number;
    offset?: {
      /** number in pixels */
      right?: number;
      /** number in pixels */
      bottom?: number;
    };
    size?: {
      /** number in pixels */
      button?: number;
      /** number in pixels */
      icon?: number;
    };
  };
  widgetContentContainer?: {
    borderRadius?: string;
    zIndex?: number;
    offset?: {
      /** number in pixels */
      side?: number;
      /** number in pixels */
      align?: number;
    };
  };
  screens?: {
    welcome?: {
      /**
       * Because the welcome screen can have dynamic content (org description and extra data collection fields), it is better to set a minHeight instead of a fixed height.
       */
      minHeight?: string;
      width?: string;
    };
    sessions?: {
      height?: string;
      width?: string;
    };
    chat?: {
      height?: string;
      width?: string;
    };
  };
};

type TextContentOptions = {
  welcomeScreen?: {
    title?: string;
    description?: string;
  };
  sessionsScreen?: {
    headerTitle?: string;
  };
  chatScreen?: {
    headerTitle?: string;
  };
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
  /**
   * Whether the widget is open or not.
   * Can be used to have the widget open by default (useful when embedded in a webview for a mobile app).
   * Also useful to open and close the widget programmatically.
   * @default false
   */
  isOpen?: boolean;
  /**
   * A custom vanilla stylesheet to override the default styles. See {@link OpenCxComponentName} for available component names.
   *
   * @example Overriding a component's styles
   * ```css
   * [data-component="sessions-screen__new-conversation-button"] {
   *   background-color: orangered;
   * }
   * ```
   *
   * @example Changing the font family
   * ```css
   * \@import url('https://fonts.googleapis.com/css2?family=Baskervville:ital,wght@0,400..700;1,400..700&display=swap');
   * * {
   *   font-family: "Baskervville", serif;
   * }
   * ```
   */
  cssOverrides?: string;
  theme?: ThemeOptions;
  assets?: {
    organizationLogo?: string;
  };
  /**
   * Initial messages that the contact sees in a new chat session.
   * These messages will disappear once the contact sends their first message.
   * @default - ['Hello, how can I help you?']
   */
  initialMessages?: string[];
  /**
   * Suggested initial questions that the contact sees in a new chat session.
   * If a user clicks on one of the suggested questions, the widget will send it as the user's first message.
   * @default undefined
   * @example - ['What is my account balance?', 'How do I pay my bill?', 'How do I change my address?']
   */
  suggestedInitialQuestions?: string[];
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
  textContent?: TextContentOptions;
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
   * The target attribute for all links in the AI or human agents responses.
   *
   * `_blank` opens links in a new tab or window.
   *
   * `_top` opens links in the same tab.
   *
   * @default '_top'
   */
  anchorTarget?: '_blank' | '_top';
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
