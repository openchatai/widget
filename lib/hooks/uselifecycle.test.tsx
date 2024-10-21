import { describe, it, vi, expect } from "vitest";
import { renderHook } from '@testing-library/react';
import { useLifecycle, useMounted, useRunOnce } from "./useLifecycle";

describe("useLifecycle", () => {
    it("should call mount and unmount", () => {
        const mount = vi.fn();
        const unmount = vi.fn();
        const { unmount: hookUnmount } = renderHook(() => useLifecycle(mount, unmount));
        expect(mount).toBeCalledTimes(1);
        hookUnmount();
        expect(unmount).toBeCalledTimes(1);
    });
})

describe("useMounted", () => {
    it("should return false on initial render", () => {
        const hook = renderHook(() => useMounted(), { initialProps: false });
        hook.unmount()
        expect(hook.result.current()).toBeFalsy();
    });

    it('should be defined', () => {
        expect(useMounted).toBeDefined();
    });

    it("should return true after initial render", () => {
        const hook = renderHook(() => useMounted(), { initialProps: false });

        hook.rerender()

        expect(hook.result.current()).toBeTruthy();
    });
})

describe("useRunOnce", () => {
    it("should call the callback once", () => {
        const callback = vi.fn();
        renderHook(() => useRunOnce(callback));
        expect(callback).toBeCalledTimes(1);
    });

    it("should not call the callback on subsequent renders", () => {
        const callback = vi.fn();
        const { rerender } = renderHook(() => useRunOnce(callback));
        rerender();
        rerender();
        rerender();
        expect(callback).toBeCalledTimes(1);
    });
})