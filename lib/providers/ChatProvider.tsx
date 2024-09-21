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
    apiUrl: config.apiUrl ?? "https://api-v2.opencopilot.so/backend",
    socketUrl: config.socketUrl ?? "https://api-v2.opencopilot.so",
    botToken: config.token,
    headers: config.headers ?? {},
    queryParams: config.queryParams ?? {},
    pathParams: config.pathParams ?? {},
    userData: config.user ?? {},
  });
  return <SafeProvider value={chat}>{children}</SafeProvider>;
}

export { useChat, ChatProvider };
