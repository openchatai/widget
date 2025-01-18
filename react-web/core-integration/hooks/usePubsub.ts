import { PubSub } from "core";
import { useSyncExternalStore } from "react";

export function usePubsub<T>(p: PubSub<T>) {
  return useSyncExternalStore(p.subscribe, p.getState, p.getState);
}
