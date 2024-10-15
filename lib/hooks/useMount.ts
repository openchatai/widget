import { useEffect } from 'react';

type Callback = () => void;

const useLifecycles = (mount: Callback, unmount?: Callback) => {
    useEffect(() => {
        if (mount) {
            mount();
        }
        return () => {
            unmount?.();
        };
    }, []);
};

export { useLifecycles };