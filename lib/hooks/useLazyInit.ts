import { useRef } from "react";

function useLazyInit<T>(init: () => T): T | null {
    const ref = useRef<T | null>(null);

    if (!ref.current) {
        ref.current = init();
    }
    
    return ref.current;
}

export { useLazyInit };
