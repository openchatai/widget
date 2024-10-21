import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { mergeRefs } from "./merge-refs";

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