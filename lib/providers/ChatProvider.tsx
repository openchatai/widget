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
  const config = useConfigData();
  const chat = useAbstractChat({
    headers: config.headers ?? {},
    queryParams: config.queryParams ?? {},
    pathParams: config.pathParams ?? {},
    userData: config.user ?? {},
    language: config.language,
    defaultHookSettings: {
      persistSession: config.settings?.persistSession ?? true,
      useSoundEffects: config.settings?.useSoundEffects ?? false,
    }
  });
  return <SafeProvider value={chat}>{children}</SafeProvider>;
}

export { useChat, ChatProvider };
