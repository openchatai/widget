import { useEffect, useSyncExternalStore } from "react";
import { LifecycleEvent, PubSub } from "../../../core";

type LifecycleHookOptions = {
    onInit?: (data: any) => void;
    onBeforeUpdate?: (data: any) => void;
    onAfterUpdate?: (data: any) => void;
    onStateChange?: (data: any) => void;
    onDestroy?: (data: any) => void;
    onError?: (data: any) => void;
};

function usePubsub<S extends any>(
    pubsub: InstanceType<typeof PubSub<S>>,
    lifecycleOptions?: LifecycleHookOptions
) {
    const state = useSyncExternalStore(pubsub.subscribe, pubsub.getState);

    useEffect(() => {
        const unsubscribers: Array<() => void> = [];

        if (lifecycleOptions) {
            // Subscribe to each lifecycle event if handler is provided
            if (lifecycleOptions.onInit) {
                unsubscribers.push(
                    pubsub.onLifecycle(LifecycleEvent.INIT, (event) => {
                        lifecycleOptions.onInit?.(event.data);
                    })
                );
            }

            if (lifecycleOptions.onBeforeUpdate) {
                unsubscribers.push(
                    pubsub.onLifecycle(LifecycleEvent.BEFORE_UPDATE, (event) => {
                        lifecycleOptions.onBeforeUpdate?.(event.data);
                    })
                );
            }

            if (lifecycleOptions.onAfterUpdate) {
                unsubscribers.push(
                    pubsub.onLifecycle(LifecycleEvent.AFTER_UPDATE, (event) => {
                        lifecycleOptions.onAfterUpdate?.(event.data);
                    })
                );
            }

            if (lifecycleOptions.onStateChange) {
                unsubscribers.push(
                    pubsub.onLifecycle(LifecycleEvent.STATE_CHANGE, (event) => {
                        lifecycleOptions.onStateChange?.(event.data);
                    })
                );
            }

            if (lifecycleOptions.onDestroy) {
                unsubscribers.push(
                    pubsub.onLifecycle(LifecycleEvent.DESTROY, (event) => {
                        lifecycleOptions.onDestroy?.(event.data);
                    })
                );
            }

            if (lifecycleOptions.onError) {
                unsubscribers.push(
                    pubsub.onLifecycle(LifecycleEvent.ERROR, (event) => {
                        lifecycleOptions.onError?.(event.data);
                    })
                );
            }
        }

        // Cleanup subscriptions
        return () => {
            unsubscribers.forEach(unsubscribe => unsubscribe());
        };
    }, [pubsub, lifecycleOptions]);

    return state;
}

export default usePubsub;
