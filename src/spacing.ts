type UnitType = "px" | "em" | "rem";

type CreateSpacingOptions = {
    factor: number;
    unit: UnitType;
    divisor: number;
};

// @ts-ignore
type Spacing<T extends keyof CSSStyleDeclaration> = `${T}.${number}`;

type SpacingResult<T extends keyof CSSStyleDeclaration> = {
    [K in T]: string;
};

const cache = new Map<string, SpacingResult<keyof CSSStyleDeclaration>>();

export function createSpacing<T extends keyof CSSStyleDeclaration>(
    options: CreateSpacingOptions,
    property: T
) {
    return (spacing: Spacing<T>): SpacingResult<T> => {
        // Check if the format is correct (property.number)
        if (!/^[a-zA-Z]+[.]\d+$/.test(spacing)) {
            throw new Error(`Invalid spacing format: expected ${String(property)}.[number]`);
        }

        const [spacingProperty, factor] = spacing.split(".") as [T, string];

        // Check if the property is correct
        if (spacingProperty !== property) {
            throw new Error(`Invalid property: expected ${property.toString()}, but got ${spacingProperty.toString()}`);
        }

        // Check if the factor is a valid number
        if (isNaN(parseInt(factor))) {
            throw new Error(`Invalid factor: expected a number, but got ${factor}`);
        }

        if (cache.has(spacing)) {
            return cache.get(spacing) as SpacingResult<T>;
        }

        const value = `${(parseInt(factor) * options.factor) / options.divisor}${options.unit}`;
        const result = { [property]: value } as SpacingResult<T>;

        cache.set(spacing, result as SpacingResult<keyof CSSStyleDeclaration>);

        return result;
    };
}
