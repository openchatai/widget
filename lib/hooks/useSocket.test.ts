import { renderHook, act } from '@testing-library/react';
import { SocketState, useSocket } from './useSocket';
import { io, Socket } from 'socket.io-client';
import { afterEach, beforeEach, describe, expect, it, vi, type Mock } from "vitest"

vi.mock("socket.io-client", () => ({
    io: vi.fn(() => ({
        on: vi.fn(),
        off: vi.fn(),
        disconnect: vi.fn(),
        emit: vi.fn(),
    }))
}))

describe('useSocket', () => {
    let socketMock: Partial<Socket>;

    beforeEach(() => {
        socketMock = {
            on: vi.fn(),
            off: vi.fn(),
            disconnect: vi.fn(),
            emit: vi.fn(),
        };
        (io as Mock).mockReturnValue(socketMock as Socket);
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('should initialize with a disconnected state', () => {
        const { result } = renderHook(() => useSocket('http://localhost', {}));
        expect(result.current.socketState).toBe<SocketState>('disconnected');
    });

    it('should connect to socket and update state when connected', async () => {
        const { result, rerender } = renderHook(() => useSocket('http://localhost', {}));

        act(() => {
            (socketMock.on as Mock).mock.calls[0][1]();
        });

        expect(result.current.socketState).toBe<SocketState>('connected');
    });

    it('should handle socket disconnection', async () => {
        const { result } = renderHook(() => useSocket('http://localhost', {}));

        act(() => {
            (socketMock.on as Mock).mock.calls.find(call => call[0] === 'disconnect')?.[1]();
        });

        expect(result.current.socketState).toBe<SocketState>('disconnected');
    });


    it('should clean up event listeners on unmount', () => {
        const { unmount } = renderHook(() => useSocket('http://localhost', {}));

        // Unmount the component
        unmount();

        // Ensure the event listeners were removed
        expect(socketMock.off).toHaveBeenCalledTimes((socketMock.on as Mock).mock.calls.length);
        expect(socketMock.disconnect).toHaveBeenCalled();
    });

});