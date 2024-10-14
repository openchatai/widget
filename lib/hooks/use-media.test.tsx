import { renderHook } from '@testing-library/react';
import { Mock, afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { useMedia } from './useMedia';
describe('useMedia', () => {
    let matchMediaMock: Mock;

    beforeAll(() => {
        matchMediaMock = matchMediaMock = vi.fn();
        window.matchMedia = matchMediaMock;
    });

    afterEach(() => {
        matchMediaMock.mockClear();
    });

    it("should return boolean for single media", () => {
        matchMediaMock.mockReturnValue({
            matches: true,
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
        })
        const { result } = renderHook(() => useMedia('(min-width: 1200px)'));
        expect(result.current).toBe(true);
    })

    it("should return correct object for multiple media queries", () => {
        matchMediaMock.mockImplementation((query) => ({
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            matches: query === "(min-width: 1200px)"
        }))

        const { result } = renderHook(() =>
            useMedia([
                { key: 'isSmall', query: '(max-width: 599px)' },
                { key: 'isLarge', query: '(min-width: 1200px)' },
            ])
        );

        expect(result.current).toEqual({
            isSmall: false,
            isLarge: true,
        });
    })

    it('should remove listener on unmount', () => {
        const removeListener = vi.fn();
        matchMediaMock.mockReturnValue({
            matches: true,
            addEventListener: vi.fn(),
            removeEventListener: removeListener,
        });

        const { unmount } = renderHook(() => useMedia('(min-width: 1200px)'));
        unmount();

        expect(removeListener).toHaveBeenCalled();
    });
})