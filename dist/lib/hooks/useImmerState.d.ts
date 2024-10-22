export declare function useImmerState<S>(initialState: S | (() => S)): [S, (f: (draft: S) => void | S) => void];
