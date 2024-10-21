import { DependencyList, useCallback, useEffect, useState, useRef } from "react";
import { ManagerOptions, Socket, SocketOptions, io } from "socket.io-client";

export type SocketState =
  | "connected"
  | "disconnected"
  | "connecting"
  | "reconnecting"
  | "reconnected"
  | "disconnecting"
  | "error";

type UseSocketReturn = {
  socket: Socket | null;
  socketState: SocketState;
  disconnect: () => void;
  useListen: (event: string, callback: (data: any) => void) => void;
};

function useSubscribe(socket: Socket | null, event: string, callback: Socket['on']) {
  useEffect(() => {
    if (!socket) return;
    socket.on(event, callback);
    return () => {
      socket.off(event, callback);
    };
  }, [socket, event, callback]);
};

function useSocket(
  url: string,
  opts: Partial<ManagerOptions & SocketOptions>,
  deps: DependencyList = []
): UseSocketReturn {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [socketState, setSocketState] = useState<SocketState>("disconnected");

  const updateState = useCallback((newState: SocketState) => {
    setSocketState(newState);
  }, []);

  const disconnect = useCallback(() => {
    if (socket) {
      socket.disconnect();
      setSocket(null);
      updateState("disconnected");
    }
  }, [socket, updateState]);


  useEffect(() => {
    if (!url) return;

    const newSocket = io(url, opts);
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
      setSocket(null);
    };
  }, [url, ...deps]);

  const useListen = (event: string, callback: (data: any) => void) => {
    useEffect(() => {
      if (!socket) return;
      socket.on(event, callback);
      return () => {
        socket.off(event, callback);
      };
    }, [socket, event, callback]);
  };

  return {
    socket,
    socketState,
    disconnect,
    useListen
  };
}
export {
  useSubscribe,
  useSocket
}