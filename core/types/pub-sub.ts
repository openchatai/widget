export type Subscriber<T> = (data: T) => void

export class PubSub<S extends object> {
    private subscribers: Set<Subscriber<S>> = new Set();
    private state: S = {} as S;
    private initialState: S = {} as S;

    constructor(state?: S) {
        this.state = state ?? {} as S;
        this.initialState = state ?? {} as S;
    }

    /**
     * Subscribe to state changes
     * @param callback Function to call when state changes
     * @returns Unsubscribe function
     */
    subscribe(callback: Subscriber<S>): () => void {
        this.subscribers.add(callback);

        return () => {
            this.subscribers.delete(callback);
        };
    }

    /**
     * Get the current state
     */
    getState(): S {
        return this.state;
    }

    /**
     * Set the state and notify subscribers if the state changes
     * @param newState The new state to set
     */
    setState(newState: S): void {
        if (this.state !== newState) {
            this.state = newState;
            this.subscribers.forEach(callback => callback(newState));
        }
    }

    setStatePartial(_s: Partial<S>): void {
        const newState = { ...this.state, ..._s };
        this.setState(newState);
    }

    /**
     * Clear all subscriptions
     */
    clear(): void {
        this.subscribers.clear();
    }

    reset(): void {
        this.setState(this.initialState);
    }
}

export function createPubSub<S extends object>(state?: S): PubSub<S> {
    return new PubSub<S>(state);
}