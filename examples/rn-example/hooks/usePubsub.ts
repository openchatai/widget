import { useEffect, useState } from 'react';
import { PubSub } from '../../../core';

export function usePubsub<S>(pubsub: PubSub<S>): S {
    const [state, setState] = useState<S>(pubsub.getState());

    useEffect(() => {
        const unsubscribe = pubsub.subscribe((newState) => {
            setState(newState);
        });

        return () => {
            unsubscribe();
        };
    }, [pubsub]);

    return state;
} 