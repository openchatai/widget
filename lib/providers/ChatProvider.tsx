import React from "react";
import { useAbstractChat } from "../hooks/useAbstractChat";
import { createSafeContext } from "../utils/create-safe-context";
import { useConsumer } from "./ConsumerProvider";

const [useChat, SafeProvider] =
  createSafeContext<ReturnType<typeof useAbstractChat>>();

function ChatProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { conversationsSWR } = useConsumer();
  const chat = useAbstractChat({});
  return <SafeProvider value={chat}>{children}</SafeProvider>;
}

export { useChat, ChatProvider };
