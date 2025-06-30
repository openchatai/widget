import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from 'react';
import { useConfig } from './useConfig';

type WidgetTriggerCtx = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const context = createContext<WidgetTriggerCtx | null>(null);

export function WidgetTriggerProvider({ children }: { children: ReactNode }) {
  const config = useConfig();
  const [isOpen, setIsOpen] = useState(config.isOpen ?? false);

  useEffect(() => {
    setIsOpen((prev) => config.isOpen ?? prev);
  }, [config.isOpen]);

  useEffect(() => {
    const openAfterNSeconds = config.openAfterNSeconds;
    if (typeof openAfterNSeconds !== 'number' || isNaN(openAfterNSeconds))
      return;

    const timeout = setTimeout(() => setIsOpen(true), openAfterNSeconds * 1000);

    return () => clearTimeout(timeout);
  }, [config.openAfterNSeconds]);

  return (
    <context.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </context.Provider>
  );
}

export function useWidgetTrigger() {
  const ctx = useContext(context);
  if (!ctx) {
    throw new Error(
      'useWidgetTrigger must be used within a WidgetTriggerProvider',
    );
  }
  return ctx;
}
