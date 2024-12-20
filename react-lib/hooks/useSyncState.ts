import { useCallback, useEffect, useMemo, useState } from "react";

const IS_SERVER = typeof window === "undefined";

type StorageType = "memory" | "local" | "session";

interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

const memoryStorage: StorageLike = {
  getItem: () => null,
  setItem: () => {
    // 
  },
  removeItem: () => {
    // 
  },
};

function getStorage(storage: StorageType): StorageLike {
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
  storage: StorageType = "session"
): [TData | null, (newState: TData | null) => void, () => void] {
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
      if (newState === null) {
        bucket.removeItem(key);
      } else {
        try {
          bucket.setItem(key, JSON.stringify(newState));
        } catch (error) {
          console.error(
            `Error saving state to storage for key '${key}':`,
            error
          );
        }
      }
    },
    [key, bucket]
  );

  const clear = useCallback(() => {
    setState(null);
    bucket.removeItem(key);
  }, [key, bucket]);

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== JSON.stringify(state)) {
        setState(e.newValue ? JSON.parse(e.newValue) : null);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key, state]);

  return [state, setSyncedState, clear];
}