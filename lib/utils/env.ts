export function isReactNative() {
    return typeof window === "undefined" && typeof navigator !== 'undefined' && navigator.product === 'ReactNative';
}