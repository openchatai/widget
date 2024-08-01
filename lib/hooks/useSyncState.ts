import { useCallback, useMemo, useState } from "react";

const IS_SERVER = typeof window === "undefined";

type StorageType = "memory" | "local" | "session";

interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

const memoryStorage: StorageLike = {
  getItem: () => null,
  setItem: () => null,
};

export function getStorage(storage: StorageType): StorageLike {
  if (IS_SERVER) {
    return memoryStorage;
  }
  if (storage === "local") {
    return localStorage;
  } else if (storage === "session") {
    return sessionStorage;
  } else {
    return memoryStorage;
  }
}

type DefaultValue<T> = T | (() => T);

export function useSyncedState<TData>(
  key: string,
  defaultValue?: DefaultValue<TData>,
  storage: StorageType = "session",
) {
  const bucket = useMemo(() => getStorage(storage), [storage]);
  const [state, setState] = useState<TData | null>(() => {
    const storageValue = bucket.getItem(key);
    if (storageValue !== null) {
      try {
        return JSON.parse(storageValue) as TData;
      } catch (error) {
        console.error(`Error parsing stored value for key '${key}':`, error);
      }
    }
    if (typeof defaultValue === "function") {
      return (defaultValue as () => TData)();
    }
    return defaultValue ?? null;
  });

  const setSyncedState = useCallback(
    (newState: TData | null) => {
      setState(newState);
      if (newState === null || newState === undefined) {
        bucket.setItem(key, "");
      } else {
        try {
          bucket.setItem(key, JSON.stringify(newState));
        } catch (error) {
          console.error(
            `Error saving state to storage for key '${key}':`,
            error,
          );
        }
      }
    },
    [key, bucket],
  );

  const clear = useCallback(() => {
    setSyncedState(null);
  }, [setSyncedState]);

  return [state, setSyncedState, clear] as const;
}
