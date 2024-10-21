import { describe, expect, it } from "vitest";
import { createSpacing } from "./spacing";

describe("createSpacing", () => {
    it("should return a function", () => {
        const spacing = createSpacing({
            divisor: 2,
            factor: 1,
            unit: "px"
        }, "margin");
        expect(spacing).toBeInstanceOf(Function);
    });

    it("should return a spacing value for valid input", () => {
        const spacing = createSpacing({
            divisor: 2,
            factor: 1,
            unit: "px"
        }, "margin");
        const result = spacing("margin.2");
        expect(result).toEqual({
            margin: "1px"
        });
    });

    it("should return a cached value when the same spacing is called multiple times", () => {
        const spacing = createSpacing({
            divisor: 2,
            factor: 1,
            unit: "px"
        }, "margin");
        const result = spacing("margin.2");
        const cachedResult = spacing("margin.2");
        expect(result).toEqual(cachedResult);  // Assert cache works correctly
        expect(cachedResult).toBe(result);     // Assert the same object reference
    });

    it("should throw an error if the property is invalid", () => {
        const spacing = createSpacing({
            divisor: 2,
            factor: 1,
            unit: "px"
        }, "margin");
        expect(() => {
            // @ts-expect-error
            spacing("padding.2");  // Invalid property
        }).toThrowError("Invalid property: expected margin, but got padding");
    });

    it("should handle different units (em, rem)", () => {
        const spacingEm = createSpacing({
            divisor: 4,
            factor: 2,
            unit: "em"
        }, "padding");
        const resultEm = spacingEm("padding.4");
        expect(resultEm).toEqual({
            padding: "2em"
        });

        const spacingRem = createSpacing({
            divisor: 2,
            factor: 1,
            unit: "rem"
        }, "padding");
        const resultRem = spacingRem("padding.3");
        expect(resultRem).toEqual({
            padding: "1.5rem"
        });
    });

    it("should handle various properties (padding, margin, gap)", () => {
        const marginSpacing = createSpacing({
            divisor: 2,
            factor: 2,
            unit: "px"
        }, "margin");
        const marginResult = marginSpacing("margin.1");
        expect(marginResult).toEqual({
            margin: "1px"
        });

        const paddingSpacing = createSpacing({
            divisor: 2,
            factor: 1,
            unit: "px"
        }, "padding");
        const paddingResult = paddingSpacing("padding.2");
        expect(paddingResult).toEqual({
            padding: "1px"
        });

        const gapSpacing = createSpacing({
            divisor: 2,
            factor: 3,
            unit: "px"
        }, "gap");
        const gapResult = gapSpacing("gap.4");
        expect(gapResult).toEqual({
            gap: "6px"
        });
    });

    it("should handle large factors and divisors", () => {
        const spacing = createSpacing({
            divisor: 100,
            factor: 50,
            unit: "px"
        }, "margin");
        const result = spacing("margin.3");
        expect(result).toEqual({
            margin: "1.5px"
        });
    });

    it("should throw an error if spacing format is incorrect", () => {
        const spacing = createSpacing({
            divisor: 2,
            factor: 1,
            unit: "px"
        }, "margin");
        expect(() => {
            // @ts-expect-error
            spacing("margin.");  // Invalid format, no number after the dot
        }).toThrowError();

        expect(() => {
            // @ts-expect-error
            spacing("margin");  // Missing the dot separator
        }).toThrowError();
    });

    it("should throw an error for non-numeric factors", () => {
        const spacing = createSpacing({
            divisor: 2,
            factor: 1,
            unit: "px"
        }, "margin");
        expect(() => {
            // @ts-expect-error
            spacing("margin.a");  // Invalid number after dot
        }).toThrowError();
    });
});
