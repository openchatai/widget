export type PromiseType<P extends Promise<unknown>> = P extends Promise<infer T>
  ? T
  : never;

export type FunctionReturningPromise = (...args: any[]) => Promise<any>;

export type MakeKeysNotNullable<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};

export type LoadingReason =
  | 'sending_message_to_bot'
  | 'sending_message_to_agent'
  | 'creating_session'
  | 'polling'
  | 'loading_contact'
  | 'saving_contact'
  | 'cleaning_up'
  | null;

export type LoadingState = {
  isLoading: boolean;
  reason: LoadingReason;
};

export type ErrorCode =
  | 'SESSION_CREATION_FAILED'
  | 'SESSION_CLEAR_FAILED'
  | 'SESSION_PERSISTENCE_FAILED'
  | 'SESSION_POLLING_FAILED'
  | 'MESSAGES_POLLING_FAILED'
  | 'MESSAGE_SEND_FAILED'
  | 'NO_ACTIVE_SESSION'
  | 'CONTACT_PERSISTENCE_FAILED'
  | 'CONTACT_LOAD_FAILED'
  | 'CONTACT_SAVE_FAILED'
  | 'CONTACT_CLEANUP_FAILED';

export type ErrorState = {
  hasError: boolean;
  message?: string;
  code?: ErrorCode;
};

export type SomeOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type SafeOmit<T, K extends keyof T> = Omit<T, K>;
