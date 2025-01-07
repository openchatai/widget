import { useSyncExternalStore } from 'react';
import { PubSub } from '@opencx/widget';

export function usePubsub<S>(pubsub: PubSub<S>): S {
    return useSyncExternalStore(pubsub.subscribe, pubsub.getState);
} 