export type TypedEventListener<M, T extends keyof M> = (
  evt: M[T],
) => void | Promise<void>;

export interface TypedEventListenerObject<M, T extends keyof M> {
  handleEvent: (evt: M[T]) => void | Promise<void>;
}

export type TypedEventListenerOrEventListenerObject<M, T extends keyof M> =
  | TypedEventListener<M, T>
  | TypedEventListenerObject<M, T>;

type ValueIsEvent<T> = {
  [key in keyof T]: Event;
};

export interface TypedEventTarget<M extends ValueIsEvent<M>> {
  addEventListener: <T extends keyof M & string>(
    type: T,
    listener: TypedEventListenerOrEventListenerObject<M, T> | null,
    options?: boolean | AddEventListenerOptions,
  ) => void;

  removeEventListener: <T extends keyof M & string>(
    type: T,
    listener: TypedEventListenerOrEventListenerObject<M, T> | null,
    options?: boolean | EventListenerOptions,
  ) => void;

  dispatchEvent: <T extends keyof M & string>(event: M[T]) => boolean;
}

export class TypedEventTarget<M extends ValueIsEvent<M>> extends EventTarget {
  constructor() {
    super();
  }

  public dispatchTypedEvent<T extends keyof M>(_type: T, event: M[T]): boolean {
    return super.dispatchEvent(event);
  }
}
