import { useCallback, useEffect, useMemo, useState } from "react";
import { ChatController } from "./messageHandler";
import { createSafeContext } from "./createSafeContext";
import { useConfigData } from "./ConfigData";
import { useSocket } from "./SocketProvider";
import { ComponentRegistry } from "./componentRegistry.ts";
import { ChatSession } from "@lib/data/chat.ts";

const [useMessageHandler, MessageHandlerSafeProvider] = createSafeContext<{
  __handler: ChatController;
  __components: ComponentRegistry;
  chatSession: ChatSession | null;
  setChatSession: (session: ChatSession) => ChatSession;
}>();

function getChatSession(): null | ChatSession {
  return JSON.parse(sessionStorage.getItem("chatSession") || "null");
}

function MessageHandlerProvider(props: { children: React.ReactNode }) {
  const { components, onHandoff, token } = useConfigData();
  const { __socket } = useSocket();
  const [chatSession, $setChatSession] = useState<ChatSession | null>(
    getChatSession
  );

  const setChatSession = useCallback(
    (session: ChatSession) => {
      $setChatSession(session);
      sessionStorage.setItem("chatSession", JSON.stringify(session));
      return session;
    },
    [$setChatSession]
  );

  const __components = useMemo(
    () => new ComponentRegistry({ components }),
    [components]
  );

  const handler = useMemo(() => new ChatController(token), [token]);
  useEffect(() => {
    if (!chatSession) return;
    __socket.on("message", handler.socketMessageRespHandler);
    __socket.on("info", handler.socketChatInfoHandler);
    __socket.on("vote", handler.socketChatVoteHandler);
    __socket.on("ui", handler.socketUiHandler);
    __socket.on("handoff", (data) => {
      handler.socketHandoffHandler(data, onHandoff);
    });
    return () => {
      __socket.off("message", handler.socketMessageRespHandler);
      __socket.off("info", handler.socketChatInfoHandler);
      __socket.off("vote", handler.socketChatVoteHandler);
      __socket.off("ui", handler.socketUiHandler);
      __socket.off("handoff", (data) => {
        handler.socketHandoffHandler(data, onHandoff);
      });
    };
  }, [chatSession, __socket, handler, onHandoff]);

  return (
    <MessageHandlerSafeProvider
      value={{
        __handler: handler,
        __components,
        chatSession,
        setChatSession,
      }}
      {...props}
    />
  );
}

export { useMessageHandler, MessageHandlerProvider };
