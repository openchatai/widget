import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { ChatController } from "./messageHandler";
import { createSafeContext } from "./createSafeContext";
import { useConfigData } from "./ConfigData";
import { ComponentRegistry } from "./componentRegistry.ts";
import { ChatSession } from "@lib/data/chat.ts";
import { produce } from "immer";
import { io, Socket } from "socket.io-client";

type SocketState = {
  state: "stale" | "connected" | "retrying" | "disconnected" | "error";
  reason: string | null;
  reconnectAttempts: number | null;
};

type ActionType =
  | {
    type: "RECONNECT_ATTEMPT";
    payload: number;
  }
  | {
    type: "CONNECTED";
  }
  | {
    type: "DISCONNECTED";
    payload: string;
  } | {
    type: "CONNECTED_TO_SESSION"
  };

const [useMessageHandler, MessageHandlerSafeProvider] = createSafeContext<{
  __handler: ChatController;
  __components: ComponentRegistry;
  chatSession: ChatSession | null;
  socketState: SocketState;
  socket: Socket | null;
  setChatSession: (session: ChatSession) => ChatSession;
}>();

function getChatSession(): null | ChatSession {
  return JSON.parse(sessionStorage.getItem("chatSession") || "null");
}

function socketReducer(state: SocketState, action: ActionType) {
  return produce(state, (draft) => {
    switch (action.type) {
      case "RECONNECT_ATTEMPT":
        draft.state = "retrying";
        draft.reconnectAttempts = action.payload;
        break;
      case "CONNECTED":
        draft.state = "connected";
        break;
      case "DISCONNECTED":
        draft.state = "disconnected";
        draft.reason = action.payload;
        break;
    }
  });
}
function MessageHandlerProvider(props: { children: React.ReactNode }) {
  const { components, onHandoff, token } = useConfigData();

  const [chatSession, $setChatSession] = useState<ChatSession | null>(
    getChatSession
  );

  const [socketState, dispatch] = useReducer(socketReducer, {
    state: "stale",
    reason: null,
    reconnectAttempts: null,
  });

  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (socket) return;
    if (socketUrl) {
      setSocket(io(socketUrl, {
        transports: ["websocket"],
        forceNew: true,
      }));
    }
  }, []);
  const { socketUrl } = useConfigData();

  const handleConnect = useCallback(() => {
    if (chatSession) {
      socket?.emit("join_session", { session_id: chatSession.id })
    }
    dispatch({ type: "CONNECTED" });
  }, []);

  const handleDisconnect = useCallback((reason: string) => {
    dispatch({ type: "DISCONNECTED", payload: reason });
  }, []);

  const handleReconnectAttempt = useCallback((attempt: number) => {
    dispatch({ type: "RECONNECT_ATTEMPT", payload: attempt });
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.on("joined_session", () => {
      dispatch({ type: "CONNECTED_TO_SESSION" })
    })
    return () => { socket.off("joined_session") }
  }, [])

  useEffect(() => {
    // Fired upon a successful connection.
    socket?.on("connect", handleConnect);
    // Fired upon a disconnection.
    socket?.on("disconnect", handleDisconnect);
    // Fired upon an attempt to reconnect.
    socket?.on("reconnect_attempt", handleReconnectAttempt);
    return () => {
      socket?.off("connect", handleConnect);
      socket?.off("disconnect", handleDisconnect);
      socket?.off("reconnect_attempt", handleReconnectAttempt);
    };
  }, [socket, handleConnect, handleDisconnect, handleReconnectAttempt]);


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
    socket?.on("message", handler.socketMessageRespHandler);
    socket?.on("info", handler.socketChatInfoHandler);
    socket?.on("vote", handler.socketChatVoteHandler);
    socket?.on("ui", handler.socketUiHandler);
    socket?.on("handoff", (data) => {
      handler.socketHandoffHandler(data, onHandoff);
    });
    return () => {
      socket?.off("message", handler.socketMessageRespHandler);
      socket?.off("info", handler.socketChatInfoHandler);
      socket?.off("vote", handler.socketChatVoteHandler);
      socket?.off("ui", handler.socketUiHandler);
      socket?.off("handoff", (data) => {
        handler.socketHandoffHandler(data, onHandoff);
      });
    };
  }, [chatSession, socket, handler, onHandoff]);

  return (
    <MessageHandlerSafeProvider
      value={{
        __handler: handler,
        __components,
        chatSession,
        setChatSession,
        socketState,
        socket,
      }}
      {...props}
    />
  );
}

export { useMessageHandler, MessageHandlerProvider };
