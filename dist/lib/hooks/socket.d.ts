import { DependencyList } from 'react';
import { ManagerOptions, Socket, SocketOptions } from 'socket.io-client';
export type SocketState = "connected" | "disconnected" | "connecting" | "reconnecting" | "reconnected" | "disconnecting" | "error";
type useSocketReturn = {
    socket: Socket | null;
    socketState: SocketState;
    disconnect: () => void;
};
export declare function useSocket(url: string, opts: Partial<ManagerOptions & SocketOptions>, _deps?: DependencyList): useSocketReturn;
export {};
