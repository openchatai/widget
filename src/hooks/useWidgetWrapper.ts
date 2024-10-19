import { useLayoutEffect, useRef, useState } from "react";
import { defaultRootId } from "src/constants";

const IS_SERVER = typeof window === "undefined";

function useWidgetWrapper() {
    const wrapper = useState<HTMLElement | null>(null);

    useLayoutEffect(() => {
        if (IS_SERVER) return;
        const root = document.getElementById(defaultRootId);
        if (!root) return;
        wrapper[1](root);
    }, []);

    return wrapper[0]
}

export {
    useWidgetWrapper
}