import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useMountedState } from './useMountedState';

describe('useMountedState', () => {
    it('should return true when component is mounted', () => {
        const { result } = renderHook(() => useMountedState());
        expect(result.current()).toBe(true);
    });

    it('should return false when component is unmounted', () => {
        const { unmount, result } = renderHook(() => useMountedState());
        unmount();
        expect(result.current()).toBe(false);
    });
});