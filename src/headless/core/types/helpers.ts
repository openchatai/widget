export type SafeExtract<T, K extends T> = Extract<T, K>;

export type StringOrLiteral<T extends string> = T | (string & {});
