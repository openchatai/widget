import React, {
  useEffect,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from 'react';
import { createSafeContext } from '../utils/create-safe-context';
import { useConfig } from './useConfig';

type WidgetTriggerCtx = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export const [useWidgetTrigger, SafeProvider] =
  createSafeContext<WidgetTriggerCtx>();

export function WidgetTriggerProvider({ children }: { children: ReactNode }) {
  const config = useConfig();
  const [isOpen, setIsOpen] = useState(config.isOpen ?? false);

  useEffect(() => {
    setIsOpen((prev) => config.isOpen ?? prev);
  }, [config.isOpen]);

  return <SafeProvider value={{ isOpen, setIsOpen }}>{children}</SafeProvider>;
}
