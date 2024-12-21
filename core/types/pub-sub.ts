/**
 * Base interface for event maps. All event maps must extend this.
 * @example
 * ```typescript
 * interface MyEvents extends EventMap {
 *   "my:event": string
 *   "my:other:event": { data: number }
 * }
 * ```
 */
export interface EventMap {
    [key: string]: any
}

/**
 * Event subscriber function type
 */
export type Subscriber<T> = (data: T) => void

/**
 * Generic PubSub class that can be typed with specific event maps.
 * Each component should create its own instance with its specific events.
 * 
 * @example
 * ```typescript
 * interface MyEvents extends EventMap {
 *   "my:event": string
 * }
 * 
 * const pubSub = new PubSub<MyEvents>();
 * 
 * pubSub.subscribe("my:event", (data) => {
 *   console.log(data.toUpperCase()); // Type-safe: data is string
 * });
 * ```
 */
export class PubSub<T extends EventMap> {
    private subscribers: Map<keyof T, Set<Subscriber<any>>> = new Map()

    /**
     * Subscribe to an event
     * @param event Event name to subscribe to
     * @param callback Function to call when event is published
     * @returns Unsubscribe function
     */
    subscribe<K extends keyof T>(
        event: K,
        callback: Subscriber<T[K]>
    ): () => void {
        if (!this.subscribers.has(event)) {
            this.subscribers.set(event, new Set())
        }
        this.subscribers.get(event)!.add(callback)

        return () => {
            const subs = this.subscribers.get(event)
            if (subs) {
                subs.delete(callback)
                if (subs.size === 0) {
                    this.subscribers.delete(event)
                }
            }
        }
    }

    /**
     * Publish an event with data
     * @param event Event name to publish
     * @param data Data to send with the event
     */
    publish<K extends keyof T>(event: K, data: T[K]): void {
        const callbacks = this.subscribers.get(event)
        if (callbacks) {
            callbacks.forEach(callback => callback(data))
        }
    }

    /**
     * Clear all subscriptions
     */
    clear(): void {
        this.subscribers.clear()
    }
}

/**
 * Abstract base class for components that need subscription management.
 * Provides common functionality for managing subscriptions and cleanup.
 * 
 * @example
 * ```typescript
 * class MyComponent extends Subscribable {
 *   constructor() {
 *     super();
 *     // Add unsubscribers
 *     this.addUnsubscriber(() => {
 *       console.log('Cleanup');
 *     });
 *   }
 * 
 *   protected cleanup(): void {
 *     // Component-specific cleanup
 *   }
 * }
 * ```
 */
export abstract class Subscribable {
    protected unsubscribers: (() => void)[] = []

    /**
     * Add an unsubscribe function to be called during cleanup
     */
    protected addUnsubscriber(unsubscribe: () => void) {
        this.unsubscribers.push(unsubscribe)
    }

    /**
     * Dispose of all subscriptions and perform cleanup
     */
    public dispose() {
        this.unsubscribers.forEach(unsubscribe => unsubscribe())
        this.unsubscribers = []
        this.cleanup()
    }

    /**
     * Component-specific cleanup logic
     */
    protected abstract cleanup(): void
}

/**
 * Helper function to create a strongly typed PubSub instance
 */
export function createPubSub<T extends EventMap>(): PubSub<T> {
    return new PubSub<T>();
}