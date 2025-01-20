import { PubSub } from "src/headless/core";
import { useSyncExternalStore } from "react";

export function usePubsub<T>(p: PubSub<T>) {
  return useSyncExternalStore(p.subscribe, p.get, p.get);
}
