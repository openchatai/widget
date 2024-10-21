import React from "react";
import { useAbstractChat, type CanSendType } from "../hooks/useAbstractChat";
import { createSafeContext } from "../utils/create-safe-context";

const [useChat, SafeProvider] =
  createSafeContext<ReturnType<typeof useAbstractChat>>();

function ChatProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const chat = useAbstractChat({});
  return <SafeProvider value={chat}>{children}</SafeProvider>;
}

export { useChat, ChatProvider, type CanSendType };
