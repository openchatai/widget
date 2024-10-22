type DefaultValue<T> = T | (() => T);
export declare function useTimeoutState<T>(initialValue: DefaultValue<T>, timeout: number): [T, (value: T) => void];
export {};
