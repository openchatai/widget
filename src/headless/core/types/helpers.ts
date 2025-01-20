export type SomeOptional<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>;

export type SafeOmit<T, K extends keyof T> = Omit<T, K>;
export type SafeExtract<T, K extends T> = Extract<T, K>;

export type StringOrLiteral<T extends string> = T | (string & {});
