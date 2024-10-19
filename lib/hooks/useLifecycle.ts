import { useEffect } from 'react';

type Callback = () => void;

const useLifecycle = (mount: Callback, unmount?: Callback) => {
    useEffect(() => {
        if (mount) {
            mount();
        }
        return () => {
            mount()
            unmount?.();
        };
    }, []);
};

export { useLifecycle };