import { useCallback, useEffect, useRef } from 'react';

type Callback = () => void;

const useLifecycle = (mount: Callback, unmount?: Callback) => {
    useEffect(() => {
        if (mount) {
            mount();
        }
        return () => {
            unmount?.();
        };
    }, []);
};

const useMounted = () => {
    const mountedRef = useRef(false);
    const get = useCallback(() => mountedRef.current, []);

    useLifecycle(() => {
        mountedRef.current = true;
    }, () => {
        mountedRef.current = false
    });

    return get
}

const useRunOnce = (callback: Callback) => {
    useEffect(() => {
        callback();
    }, []);
}

export { useLifecycle, useRunOnce, useMounted };