import { FunctionReturningPromise, PromiseType } from '../types';
import { DependencyList } from 'react';
export type AsyncState<T> = {
    loading: boolean;
    error?: undefined;
    value?: undefined;
} | {
    loading: true;
    error?: Error | undefined;
    value?: T;
} | {
    loading: false;
    error: Error;
    value?: undefined;
} | {
    loading: false;
    error?: undefined;
    value: T;
};
type StateFromFunctionReturningPromise<T extends FunctionReturningPromise> = AsyncState<PromiseType<ReturnType<T>>>;
export type AsyncFnReturn<T extends FunctionReturningPromise = FunctionReturningPromise> = [StateFromFunctionReturningPromise<T>, T];
export declare function useAsyncFn<T extends FunctionReturningPromise>(fn: T, deps?: DependencyList, initialState?: StateFromFunctionReturningPromise<T>): AsyncFnReturn<T>;
export {};
