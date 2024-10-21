import React from "react";

function useLazyRef<T>(init: () => T) {
    const ref = React.useRef<T | null>(null);

    if (!ref.current) {
        ref.current = init();
    }

    return ref as React.MutableRefObject<T>
}

export { useLazyRef };
