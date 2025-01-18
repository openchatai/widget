import { useEffect, useState } from "react";
import { useChat } from "../ChatProvider";
import { usePubsub } from "./usePubsub";

export function useChatSession() {
  const { chat } = useChat();
  const chatSession = usePubsub(chat.sessionState);
  return {
    chat,
    chatSession,
  };
}
