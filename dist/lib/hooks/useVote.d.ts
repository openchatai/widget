export declare function useUpvote(id: string, onSuccess?: () => void): import('./useAsyncFn').AsyncFnReturn<() => Promise<import('axios').AxiosResponse<{
    message: string;
}, any>>>;
export declare function useDownvote(id: string, onSuccess?: () => void): import('./useAsyncFn').AsyncFnReturn<() => Promise<import('axios').AxiosResponse<{
    message: string;
}, any>>>;
