import { useCallback, useEffect, useMemo, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { isReactNative } from "@lib/utils/env";

const IS_SERVER = typeof window === "undefined";

type StorageType = "memory" | "local" | "session";

interface StorageLike {
  getItem(key: string): Promise<string | null> | string | null;
  setItem(key: string, value: string): Promise<void> | void;
  removeItem(key: string): Promise<void> | void;
}

const memoryStorage: Record<string, string> = {};

const memoryStorageLike: StorageLike = {
  getItem: (key) => memoryStorage[key] || null,
  setItem: (key, value) => {
    memoryStorage[key] = value;
  },
  removeItem: (key) => {
    delete memoryStorage[key];
  },
};

function getStorage(storage: StorageType): StorageLike {
  if (IS_SERVER || isReactNative()) {
    return memoryStorageLike;
  }
  if (storage === "local") {
    return localStorage;
  } else if (storage === "session") {
    return sessionStorage;
  } else {
    return memoryStorageLike;
  }
}

async function getAsyncStorage(storage: StorageType): Promise<StorageLike> {
  if (isReactNative()) {
    return {
      getItem: async (key) => await AsyncStorage.getItem(key),
      setItem: async (key, value) => await AsyncStorage.setItem(key, value),
      removeItem: async (key) => await AsyncStorage.removeItem(key),
    };
  }
  return getStorage(storage);
}

type DefaultValue<T> = T | (() => T);

export function useSyncedState<TData>(
  key: string,
  defaultValue?: DefaultValue<TData>,
  storage: StorageType = "session"
): [TData | null, (newState: TData | null) => void, () => void] {
  const [bucket, setBucket] = useState<StorageLike>(() => memoryStorageLike);
  const [state, setState] = useState<TData | null>(null);

  useEffect(() => {
    const initializeStorage = async () => {
      const resolvedBucket = await getAsyncStorage(storage);
      setBucket(resolvedBucket);

      const storageValue = await resolvedBucket.getItem(key);
      if (storageValue !== null) {
        try {
          setState(JSON.parse(storageValue) as TData);
        } catch (error) {
          console.error(`Error parsing stored value for key '${key}':`, error);
        }
      } else if (typeof defaultValue === "function") {
        setState((defaultValue as () => TData)());
      } else {
        setState(defaultValue ?? null);
      }
    };
    initializeStorage();
  }, [key, storage, defaultValue]);

  const setSyncedState = useCallback(
    async (newState: TData | null) => {
      setState(newState);
      if (newState === null) {
        await bucket.removeItem(key);
      } else {
        try {
          await bucket.setItem(key, JSON.stringify(newState));
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

  const clear = useCallback(async () => {
    setState(null);
    await bucket.removeItem(key);
  }, [key, bucket]);

  useEffect(() => {
    if (!isReactNative()) {
      const handleStorageChange = (e: StorageEvent) => {
        if (e.key === key && e.newValue !== JSON.stringify(state)) {
          setState(e.newValue ? JSON.parse(e.newValue) : null);
        }
      };

      window.addEventListener("storage", handleStorageChange);
      return () => {
        window.removeEventListener("storage", handleStorageChange);
      };
    }
  }, [key, state]);

  return [state, setSyncedState, clear];
}
