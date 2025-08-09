// TODO clean unused translations
export type TranslationKeysU =
  | 'i-need-more-help'
  | 'this-was-helpful'
  | 'write-a-message'
  | 'session-closed-lead'
  | 'new-conversation'
  | 'back-to-conversations'
  | 'closed-conversations'
  | 'no-conversations-yet'
  | 'welcome-title'
  | 'welcome-description'
  | 'your-name'
  | 'your-email'
  | 'optional'
  | 'start-chat'
  | 'starting-chat';

export type TranslationInterface = {
  [K in TranslationKeysU]: string;
};
