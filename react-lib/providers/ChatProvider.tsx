import React from "react";
import { useAbstractChat } from "../hooks/useAbstractChat";
import { createSafeContext } from "../utils/create-safe-context";
import { useConfigData } from "./ConfigDataProvider";

const [useChat, SafeProvider] =
  createSafeContext<ReturnType<typeof useAbstractChat>>();

function ChatProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { settings } = useConfigData();
  const chat = useAbstractChat({
    defaultHookSettings: {
      persistSession: settings?.persistSession ?? true,
      useSoundEffects: settings?.useSoundEffects ?? false,
    },
  });
  return <SafeProvider value={chat}>{children}</SafeProvider>;
}

export { useChat, ChatProvider };
