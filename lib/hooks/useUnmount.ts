import { useEffect } from "react";

function useUnmount(callback: () => void) {
    useEffect(() => {
        return callback;
    }, []);
}

export {
    useUnmount
}