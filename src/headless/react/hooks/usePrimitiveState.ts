import { useSyncExternalStore } from 'react';
import type { PrimitiveState } from '../../core';

export function usePrimitiveState<T>(p: PrimitiveState<T>) {
  return useSyncExternalStore(p.subscribe, p.get, p.get);
}
