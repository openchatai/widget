import isEqual from "lodash.isequal";

export type Subscriber<T> = (data: T) => void;

export enum LifecycleEvent {
  INIT = "init",
  STATE_CHANGE = "stateChange",
  BEFORE_UPDATE = "beforeUpdate",
  AFTER_UPDATE = "afterUpdate",
  DESTROY = "destroy",
  ERROR = "error",
}

type LifecycleListener = (event: {
  type: LifecycleEvent;
  timestamp: number;
  data?: any;
}) => void;

export class PubSub<S> {
  private subscribers = new Set<Subscriber<S>>();
  #state: S;
  private initialState: S;
  #lastUpdated: number | null;
  private lifecycleListeners: Map<LifecycleEvent, Set<LifecycleListener>> =
    new Map();

  constructor(state: S) {
    this.#state = state;
    this.initialState = state;
    this.#lastUpdated = Date.now();
    this.emitLifecycle(LifecycleEvent.INIT, { initialState: this.#state });
  }

  private emitLifecycle = (event: LifecycleEvent, data?: any) => {
    const listeners = this.lifecycleListeners.get(event);
    if (listeners) {
      const eventData = {
        type: event,
        timestamp: Date.now(),
        data,
      };
      listeners.forEach((listener) => {
        try {
          listener(eventData);
        } catch {
          // ignore error
        }
      });
    }
  };

  private notifySubscribers = (state: S) => {
    const subscribersArray = Array.from(this.subscribers);
    subscribersArray.forEach((callback) => {
      try {
        callback(state);
      } catch (error) {
        this.emitLifecycle(LifecycleEvent.ERROR, { error });
      }
    });
  };

  /**
   * Subscribe to state changes
   * @param callback Function to call when state changes
   * @returns Unsubscribe function
   */
  subscribe = (callback: Subscriber<S>): (() => void) => {
    this.subscribers.add(callback);
    // Don't call the callback immediately with current state
    return () => {
      this.subscribers.delete(callback);
    };
  };

  onLifecycle = (
    event: LifecycleEvent,
    listener: LifecycleListener,
  ): (() => void) => {
    if (!this.lifecycleListeners.has(event)) {
      this.lifecycleListeners.set(event, new Set());
    }
    const listeners = this.lifecycleListeners.get(event)!;
    listeners.add(listener);

    return () => {
      listeners.delete(listener);
      if (listeners.size === 0) {
        this.lifecycleListeners.delete(event);
      }
    };
  };

  /** Get the current state */
  get = (): S => {
    return this.#state;
  };

  // TODO make this provide prev state
  /**
   * Set the state and notify subscribers if the state changes
   * @param newState The new state to set
   */
  set = (newState: S): void => {
    this.emitLifecycle(LifecycleEvent.BEFORE_UPDATE, {
      previousState: this.#state,
      nextState: newState,
    });

    if (!isEqual(this.#state, newState)) {
      this.#state = newState;
      this.#lastUpdated = Date.now();
      this.emitLifecycle(LifecycleEvent.STATE_CHANGE, { state: newState });
      this.notifySubscribers(newState);
    }

    this.emitLifecycle(LifecycleEvent.AFTER_UPDATE, { state: newState });
  };

  // TODO make this provide prev state
  setPartial = (_s: Partial<S>): void => {
    if (_s === undefined || _s === null) return;
    const newState = { ...this.#state, ..._s };
    this.set(newState);
  };

  /**
   * Clear all subscriptions
   */
  clear = (): void => {
    this.emitLifecycle(LifecycleEvent.DESTROY);
    this.subscribers = new Set(); // Create a new Set instead of just clearing
    this.lifecycleListeners = new Map();
  };

  reset = (): void => {
    this.set(this.initialState);
  };

  lastUpdated = (): number | null => {
    return this.#lastUpdated;
  };
}
