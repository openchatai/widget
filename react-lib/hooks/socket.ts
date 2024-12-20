import { DependencyList, useCallback, useEffect, useState } from "react";
import { ManagerOptions, Socket, SocketOptions, io } from "socket.io-client";

export type SocketState =
  | "connected"
  | "disconnected"
  | "connecting"
  | "reconnecting"
  | "reconnected"
  | "disconnecting"
  | "error";

type useSocketReturn = {
  socket: Socket | null;
  socketState: SocketState;
  disconnect: () => void;
  useListen: (event: string, callback: (data: any) => void, deps?: DependencyList) => void
};

export function useSocket(
  url: string,
  opts: Partial<ManagerOptions & SocketOptions>,
  _deps: DependencyList = [],
): useSocketReturn {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [socketState, setState] = useState<SocketState>("disconnected");

  const updateState = (newState: SocketState) => {
    setState(newState);
  };

  const disconnect = () => {
    if (socket) {
      socket.disconnect();
      setSocket(null);
      updateState("disconnected");
    }
  };
  const onConnect = useCallback(() => updateState("connected"), [updateState]);
  const onDisconnect = useCallback(() => updateState("disconnected"), [updateState]);
  const onConnectError = useCallback(() => updateState("error"), [updateState]);
  const onReconnect = useCallback(() => updateState("reconnected"), [updateState]);
  const onReconnecting = useCallback(() => updateState("reconnecting"), [updateState]);
  const onReconnectError = useCallback(() => updateState("error"), [updateState]);
  const onReconnectFailed = useCallback(() => updateState("error"), [updateState]);

  useEffect(() => {
    if (!url) return;
    const newSocket = io(url, opts);
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
      setSocket(null);
    };
  }, [url]);

  const useListen = (event: string, callback: (data: any) => void, deps: DependencyList = []) => {
    useEffect(() => {
      if (!socket) return;
      socket.on(event, callback);
      return () => {
        socket.off(event, callback);
      };
    }, [socket, event, callback, ...deps]);
  };

  useEffect(() => {
    if (!socket) return;
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("connect_error", onConnectError);
    socket.on("reconnect", onReconnect);
    socket.on("reconnecting", onReconnecting);
    socket.on("reconnect_error", onReconnectError);
    socket.on("reconnect_failed", onReconnectFailed);
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("connect_error", onConnectError);
      socket.off("reconnect", onReconnect);
      socket.off("reconnecting", onReconnecting);
      socket.off("reconnect_error", onReconnectError);
      socket.off("reconnect_failed", onReconnectFailed);
    };
  }, [
    onConnect,
    onConnectError,
    onDisconnect,
    onReconnect,
    onReconnectError,
    onReconnectFailed,
    onReconnecting,
    socket,
  ]);
  return {
    socket,
    socketState,
    disconnect,
    useListen
  };
}
