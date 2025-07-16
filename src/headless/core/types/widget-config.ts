import type { AgentOrBotType } from './agent-or-bot';

// The type is imported so the `@link` in the jsdoc works
// eslint-disable-next-line unused-imports/no-unused-imports
import type { OpenCxComponentNameU } from './component-name';
import type { IconNameU } from './icons';
import type { JsonValue } from './json-value';

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
  /**
   * @default 'stone'
   */
  palette?: 'neutral' | 'stone' | 'zinc' | 'slate';
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
    zIndex?: number;
    offset?: {
      /** number in pixels */
      side?: number;
      /** number in pixels */
      align?: number;
    };
    outline?: string;
    outlineColor?: string;
    borderRadius?: string;
    boxShadow?: string;
    transitionProperty?: string;
    transitionTimingFunction?: string;
    transitionDuration?: string;
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

type HeaderButtonBase = {
  icon?: IconNameU;
  // textContent?: string;
  // tooltipContent?: string;
  hideOnSmallScreen?: boolean;
  hideOnLargeScreen?: boolean;
};

export type HeaderButtonU =
  | (HeaderButtonBase & {
      functionality: 'expand-shrink';
      /** if `HeaderButtonBase.icon` is passed, it will override this option  */
      expandIcon?: IconNameU;
      /** if `HeaderButtonBase.icon` is passed, it will override this option  */
      shrinkIcon?: IconNameU;
    })
  | (HeaderButtonBase & {
      functionality: 'close-widget';
    })
  | (HeaderButtonBase & {
      functionality: 'resolve-session';
      onResolved?:
        | 'reset-chat'
        | 'close-widget'
        | 'reset-chat-and-close-widget';
      confirmation?: {
        type: 'modal';
        title?: string;
        description?: string;
        confirmButtonText?: string;
        cancelButtonText?: string;
      };
    });

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
   * Automatically open the widget after N seconds.
   * @default undefined
   */
  openAfterNSeconds?: number;
  /**
   * A custom vanilla stylesheet to override the default styles. See {@link OpenCxComponentNameU} for available component names.
   *
   * @example Overriding a component's styles
   * ```css
   * [data-component="sessions_screen/new_conversation_button"] {
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
  /**
   * Assets URLs to be used in the widget.
   */
  assets?: {
    organizationLogo?: string;
    widgetTrigger?: {
      openIcon?: string;
      closeIcon?: string;
    };
  };
  /**
   * Initial messages that the contact sees in a new chat session.
   * These messages will disappear once the contact sends their first message.
   * @default - ['Hello, how can I help you?']
   */
  initialMessages?: string[];
  /**
   * Similar to `initialMessages`, but these messages will persist at the top of the chat session.
   * Useful if you want to keep a notice or a privacy policy warning.
   * @default undefined
   */
  persistentInitialMessages?: string[];
  /**
   * Suggested initial questions that the contact sees in a new chat session.
   * If a user clicks on one of the suggested questions, the widget will send it as the user's first message.
   * @default undefined
   * @example - ['What is my account balance?', 'How do I pay my bill?', 'How do I change my address?']
   */
  initialQuestions?: string[];
  /**
   * Where to display the suggested initial questions.
   * @default 'above-chat-input'
   */
  initialQuestionsPosition?: 'above-chat-input' | 'below-initial-messages';
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
   * Custom header buttons to expand-shrink the size of the widget, close the widget, resolve the session, etc.
   *
   * Note that using this options will remove the default `close-widget` button on small screens.
   *
   * @default close-widget button on small screens
   */
  headerButtons?: {
    sessionsScreen?: Array<HeaderButtonU>;
    chatScreen?: Array<HeaderButtonU>;
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
    /**
     * If true, only the `welcome` and `chat` screens are visible.
     * The most recent `open` session will be selected.
     * If none found, a new empty conversation will be opened, and a session will be created if the user sends a message.
     * The `back to sessions screen` button in the header will be hidden.
     *
     * @default false
     */
    chatScreenOnly?: boolean;
  };
  /**
   * By default, the user can have multiple open sessions.
   *
   * Setting this option to `true` will hide the `new conversation` button if there is an open session.
   *
   * @default false
   */
  oneOpenSessionAllowed?: boolean;
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
   * Headers to be added to every Http AI action taken.
   * @default undefined
   */
  headers?: Record<string, string>;
  /**
   * Query params to be added to every Http AI action taken.
   * @default undefined
   */
  queryParams?: Record<string, string>;
  /**
   * Properties to be added to the `body` of every Http AI action taken.
   * @default undefined
   */
  bodyProperties?: Record<string, JsonValue>;
  /**
   * Dynamic context to be sent with each send-message request from the widget.
   * Useful if you want to send data regarding the current page the user is viewing.
   * @default undefined
   */
  context?: Record<string, unknown>;
  /**
   * Dynamic custom data to be sent with each contact message.
   * This custom data is intended for human use only; the AI will not see it and it will not affect the AI's response.
   * @default undefined
   */
  messageCustomData?: Record<string, unknown>;
  /**
   * An apiUrl to override production backend.
   * This is for us to test the widget locally, you don't need to play with this option 😊.
   * @default https://api.open.cx
   */
  apiUrl?: string;
}
