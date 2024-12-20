import { useEffect, useState } from "react";

type DefaultValue<T> = T | (() => T);

export function useTimeoutState<T>(
  initialValue: DefaultValue<T>,
  timeout: number,
): [T, (value: T) => void] {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    const id = setTimeout(() => setValue(initialValue), timeout);
    return () => clearTimeout(id);
  }, [initialValue, timeout, value]);

  return [value, setValue];
}
