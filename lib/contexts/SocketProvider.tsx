import { Socket, io } from "socket.io-client";
import { ReactNode, useCallback, useEffect, useReducer, useState } from "react";
import { useConfigData } from "./ConfigData";
import { createSafeContext } from "./createSafeContext";
import { produce } from "immer";
import { useMessageHandler } from "./statefulMessageHandler";

type SocketState = {
  state: "stale" | "connected" | "retrying" | "disconnected" | "error";
  reason: string | null;
  reconnectAttempts: number | null;
};

type SocketContextData = {
  __socket: Socket | null;
  state: SocketState;
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

const [useSocket, SocketSafeProvider] = createSafeContext<SocketContextData>();

function SocketProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(socketReducer, {
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
  const { chatSession } = useMessageHandler();

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

  return (
    <SocketSafeProvider value={{ __socket: socket, state }}>
      {children}
    </SocketSafeProvider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export { useSocket, SocketProvider };
