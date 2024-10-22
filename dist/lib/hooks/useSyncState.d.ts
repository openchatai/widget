type StorageType = "memory" | "local" | "session";
type DefaultValue<T> = T | (() => T);
export declare function useSyncedState<TData>(key: string, defaultValue?: DefaultValue<TData>, storage?: StorageType): [TData | null, (newState: TData | null) => void, () => void];
export {};
