import { PubSub } from "@core/types";
import { useSyncExternalStore } from "react";

export function usePubsub<T>(p: PubSub<T>) {
    return useSyncExternalStore(p.subscribe, p.getState, p.getState);
}