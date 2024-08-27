import { createContext, useContext } from "react";

export function createSafeContext<TDdata>(init?: TDdata) {
  const context = createContext(init ?? ({} as TDdata));

  const useSafeContext = () => {
    const ctx = useContext(context);
    if (ctx === undefined) {
      throw new Error("useSafeContext must be used within a Provider");
    }
    return ctx;
  };

  return [useSafeContext, context.Provider] as const;
}
