/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect, DependencyList, useCallback } from "react";
import { io, ManagerOptions, Socket, SocketOptions } from "socket.io-client";

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
  const onConnect = useCallback(() => updateState("connected"), []);
  const onDisconnect = useCallback(() => updateState("disconnected"), []);
  const onConnectError = useCallback(() => updateState("error"), []);
  const onReconnect = useCallback(() => updateState("reconnected"), []);
  const onReconnecting = useCallback(() => updateState("reconnecting"), []);
  const onReconnectError = useCallback(() => updateState("error"), []);
  const onReconnectFailed = useCallback(() => updateState("error"), []);

  useEffect(() => {
    if (!url) return;
    const newSocket = io(url, opts);
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
      setSocket(null);
    };
  }, [url]);

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
  };
}
