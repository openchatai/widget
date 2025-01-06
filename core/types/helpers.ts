export type PromiseType<P extends Promise<unknown>> = P extends Promise<infer T>
  ? T
  : never;

export type FunctionReturningPromise = (...args: any[]) => Promise<any>;

export type MakeKeysNotNullable<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};

export type LoadingReason =
  | 'sending_message'
  | 'creating_session'
  | 'polling'
  | 'loading_contact'
  | 'saving_contact'
  | 'cleaning_up'
  | null;

export type LoadingState = {
  isLoading: boolean;
  reason?: LoadingReason;
};

export type ErrorCode =
  | 'SESSION_CREATION_FAILED'
  | 'SESSION_CLEAR_FAILED'
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
