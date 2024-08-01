export type PromiseType<P extends Promise<unknown>> = P extends Promise<infer T>
  ? T
  : never;

export type FunctionReturningPromise = (...args: unknown[]) => Promise<unknown>;
