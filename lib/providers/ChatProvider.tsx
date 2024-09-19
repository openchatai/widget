import React from "react";
import { useChat as _useChat } from "../hooks/useChat";
import { createSafeContext } from "../utils/create-safe-context";
import { useConfigData } from "./ConfigDataProvider";

const [useChat, SafeProvider] =
  createSafeContext<ReturnType<typeof _useChat>>();

function ChatProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const config = useConfigData();
  const chat = _useChat({
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
