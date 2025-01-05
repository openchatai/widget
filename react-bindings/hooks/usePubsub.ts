import { PubSub } from "@core/types";
import { useSyncExternalStore } from "react";

function usePubsub<S extends any>(p: InstanceType<typeof PubSub<S>>) {
    return useSyncExternalStore(p.subscribe, p.getSnapshot, p.getSnapshot);
}

export default usePubsub;
