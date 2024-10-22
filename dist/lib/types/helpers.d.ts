export type PromiseType<P extends Promise<unknown>> = P extends Promise<infer T> ? T : never;
export type FunctionReturningPromise = (...args: unknown[]) => Promise<unknown>;
export type MakeKeysNotNullable<T, K extends keyof T> = Omit<T, K> & {
    [P in K]-?: NonNullable<T[P]>;
};
