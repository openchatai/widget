import React, {
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from 'react';
import { createSafeContext } from '../utils/create-safe-context';

type WidgetTriggerCtx = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export const [useWidgetTrigger, SafeProvider] =
  createSafeContext<WidgetTriggerCtx>();

export function WidgetTriggerProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return <SafeProvider value={{ isOpen, setIsOpen }}>{children}</SafeProvider>;
}
