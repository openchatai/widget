import * as React from 'react';

/**
 * A function that merges React refs into one.
 * Supports both functions and ref objects created using createRef() and useRef().
 *
 * Usage:
 * ```tsx
 * <div ref={mergeRefs(ref1, ref2, ref3)} />
 * ```
 *
 * @param {(React.Ref<T> | undefined)[]} inputRefs Array of refs
 * @returns {React.Ref<T> | React.RefCallback<T>} Merged refs
 */
export function mergeRefs<T>(
    ...inputRefs: (React.Ref<T> | undefined)[]
): React.Ref<T> | React.RefCallback<T> {
    const filteredInputRefs = inputRefs.filter(Boolean);

    if (filteredInputRefs.length <= 1) {
        const firstRef = filteredInputRefs[0];

        return firstRef || null;
    }

    return function mergedRefs(ref) {
        for (const inputRef of filteredInputRefs) {
            if (typeof inputRef === 'function') {
                inputRef(ref);
            } else if (inputRef) {
                (inputRef as React.MutableRefObject<T | null>).current = ref;
            }
        }
    };
}


if (import.meta.vitest) {
    const { expect, describe, it, vi } = import.meta.vitest;
    const { render, screen } = await import('@testing-library/react');

    describe('mergeRefs', () => {
        it('merges multiple refs', () => {
            const ref1 = React.createRef<HTMLDivElement>();
            const ref2 = React.createRef<HTMLDivElement>();
            const ref3 = React.createRef<HTMLDivElement>();

            render(<div ref={mergeRefs(ref1, ref2, ref3)} data-testid="div" />);

            const element = screen.getByTestId('div');
            expect(ref1.current).toBe(element);
            expect(ref2.current).toBe(element);
            expect(ref3.current).toBe(element);
        });

        it('merges multiple refs with some being undefined', () => {
            const ref1 = React.createRef<HTMLDivElement>();
            const ref2 = React.createRef<HTMLDivElement>();

            render(<div ref={mergeRefs(ref1, undefined, ref2, undefined)} data-testid="div" />);

            const element = screen.getByTestId('div');

            expect(ref1.current).toBe(element);
            expect(ref2.current).toBe(element);
        });

        it('merges multiple refs with some being null', () => {
            const ref1 = React.createRef<HTMLDivElement>();
            const ref2 = React.createRef<HTMLDivElement>();

            render(<div ref={mergeRefs(ref1, null, ref2, null)} data-testid="div" />);

            const element = screen.getByTestId('div');

            expect(ref1.current).toBe(element);
            expect(ref2.current).toBe(element);
        });

        it('merges multiple refs with some being functions', () => {
            const ref1 = React.createRef<HTMLDivElement>();
            const ref2 = React.createRef<HTMLDivElement>();
            const ref3 = React.createRef<HTMLDivElement>();

            const refFn1 = vi.fn();
            const refFn2 = vi.fn();

            render(<div ref={mergeRefs(ref1, refFn1, ref2, ref3, refFn2)} data-testid="div" />);

            const element = screen.getByTestId('div');

            expect(ref1.current).toBe(element);
            expect(ref2.current).toBe(element);
            expect(ref3.current).toBe(element);
            expect(refFn1).toHaveBeenCalledWith(element);
            expect(refFn2).toHaveBeenCalledWith(element);
        });
    });

}