import { useEffect, useState } from "react";

type MediaQueryType = string | { key: string; query: string }[];

type useMediaQueryReturnType<T extends MediaQueryType> =
    T extends string ? boolean :
    T extends { key: string; query: string }[] ? Record<string, boolean> :
    never;

function matchMedia(query: string): MediaQueryList {
    return window.matchMedia(query);
}

function useMedia<T extends MediaQueryType>(mq: T): useMediaQueryReturnType<T> {
    const [matches, setMatches] = useState<useMediaQueryReturnType<T>>(
        () => {
            if (typeof mq === 'string') {
                return matchMedia(mq).matches as useMediaQueryReturnType<T>;
            } else {
                return mq.reduce((acc, { key, query }) => {
                    acc[key] = matchMedia(query).matches;
                    return acc;
                }, {} as Record<string, boolean>) as useMediaQueryReturnType<T>;
            }
        }
    );
    useEffect(() => {
        if (typeof mq === 'string') {
            const mediaQueryList = matchMedia(mq);
            const listener = (e: MediaQueryListEvent) => setMatches(e.matches as useMediaQueryReturnType<T>);
            mediaQueryList.addEventListener("change", listener);
            return () => mediaQueryList.removeEventListener("change", listener);
        }
        else if (Array.isArray(mq)) {
            const mediaQueryLists = mq.map(({ key, query }) => ({ key, mql: matchMedia(query) }));
            const listener = () => {
                const newMatches = mediaQueryLists.reduce((acc, { key, mql }) => {
                    acc[key] = mql.matches;
                    return acc;
                }, {} as Record<string, boolean>);
                setMatches(newMatches as useMediaQueryReturnType<T>);
            };

            mediaQueryLists.forEach(({ mql }) => mql.addEventListener('change', listener));
            return () => mediaQueryLists.forEach(({ mql }) => mql.removeEventListener("change", listener));
        }
    }, [mq])
    return matches
}

export { useMedia }