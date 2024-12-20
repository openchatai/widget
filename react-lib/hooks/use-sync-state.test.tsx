import { act, cleanup, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useSyncedState } from './useSyncState';

describe('useSyncedState', () => {
    const key = 'testKey';

    beforeEach(() => {
        // Clear local storage and session storage before each test
        localStorage.clear();
        sessionStorage.clear();
    });

    afterEach(() => {
        cleanup();
    });

    it('should initialize state from session storage', () => {
        // Set initial value in session storage
        sessionStorage.setItem(key, JSON.stringify({ value: 'test' }));

        const { result } = renderHook(() => useSyncedState(key));

        expect(result.current[0]).toEqual({ value: 'test' });
    });

    it('should use default value if storage is empty', () => {
        const { result } = renderHook(() => useSyncedState(key, { value: 'default' }));

        expect(result.current[0]).toEqual({ value: 'default' });
    });

    it('should update state and storage when setState is called', () => {
        const { result } = renderHook(() => useSyncedState(key));

        act(() => {
            result.current[1]({ value: 'updated' });
        });

        expect(result.current[0]).toEqual({ value: 'updated' });
        expect(sessionStorage.getItem(key)).toEqual(JSON.stringify({ value: 'updated' }));
    });

    it('should remove state from storage when null is set', () => {
        const { result } = renderHook(() => useSyncedState(key));

        act(() => {
            result.current[1]({ value: 'updated' });
        });

        expect(sessionStorage.getItem(key)).toBeTruthy();

        act(() => {
            result.current[1](null);
        });

        expect(sessionStorage.getItem(key)).toBeNull();
        expect(result.current[0]).toBeNull();
    });

    it('should clear state and storage when clear is called', () => {
        const { result } = renderHook(() => useSyncedState(key));

        act(() => {
            result.current[1]({ value: 'updated' });
        });

        expect(result.current[0]).toEqual({ value: 'updated' });

        act(() => {
            result.current[2]();
        });

        expect(result.current[0]).toBeNull();
        expect(sessionStorage.getItem(key)).toBeNull();
    });

    it('should handle JSON parsing errors', () => {
        // Set a malformed JSON in session storage
        sessionStorage.setItem(key, 'malformed json');

        const { result } = renderHook(() => useSyncedState(key));

        // Expect to log an error and default to null
        expect(result.current[0]).toBeNull();
    });

    it('should handle errors when setting storage', () => {
        // Mock console.error to test error handling
        const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {
            // 
        });

        const { result } = renderHook(() => useSyncedState(key));

        // Mock localStorage.setItem to throw an error
        const originalSetItem = Storage.prototype.setItem;
        Storage.prototype.setItem = vi.fn().mockImplementation(() => {
            throw new Error('Storage full');
        });

        act(() => {
            result.current[1]({ value: 'test' });
        });

        expect(consoleErrorSpy).toHaveBeenCalled();

        // Restore original implementation
        Storage.prototype.setItem = originalSetItem;
        consoleErrorSpy.mockRestore();
    });
});
