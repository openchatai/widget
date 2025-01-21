import { useSyncExternalStore } from "react";
import type { PubSub } from "../../core";

export function usePubsub<T>(p: PubSub<T>) {
  return useSyncExternalStore(p.subscribe, p.get, p.get);
}
