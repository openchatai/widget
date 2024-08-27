import { produce } from "immer";
import { useState } from "react";

export function useImmerState<S>(
  initialState: S | (() => S),
): [S, (f: (draft: S) => void | S) => void] {
  const [_, __] = useState(initialState);
  const setImmerState = (f: (draft: S) => void | S) => {
    __((state) => produce(state, f));
  };
  return [_, setImmerState];
}
