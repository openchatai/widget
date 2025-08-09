import { useSyncExternalStore } from 'react';
import type { PrimitiveState } from '@opencx/widget-core';

export function usePrimitiveState<T>(p: PrimitiveState<T>) {
  return useSyncExternalStore(p.subscribe, p.get, p.get);
}
