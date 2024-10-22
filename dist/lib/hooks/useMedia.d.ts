type MediaQueryType = string | {
    key: string;
    query: string;
}[];
type useMediaQueryReturnType<T extends MediaQueryType> = T extends string ? boolean : T extends {
    key: string;
    query: string;
}[] ? Record<string, boolean> : never;
declare function useMedia<T extends MediaQueryType>(mq: T): useMediaQueryReturnType<T>;
export { useMedia };
