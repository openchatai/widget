import { noop } from "./noop";

function debugAssert() {
    if (process.env.NODE_ENV !== 'production') {
        return function assert(condition: any, message: string) {
            if (!condition) {
                throw new Error(message || '[DEBUG]: Assertion failed');
            }
        };
    }
    return noop
}

export {
    debugAssert
}

if (import.meta.vitest) {
    const { it, expect, describe } = import.meta.vitest;
    describe('debugAssert', () => {
        it('should throw an error when condition is false', () => {
            const assert = debugAssert();
            expect(() => assert(false, 'message')).toThrowError('message');
        });

        it('should not throw an error when condition is true', () => {
            const assert = debugAssert();
            expect(() => assert(true, 'message')).not.toThrow();
        });
    });
}