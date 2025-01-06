/**
 * Platform-agnostic storage interface that can be implemented
 * for different environments (web, mobile, desktop, etc.)
 */
export interface Storage {
    /**
     * Retrieves the value associated with the given key
     * @param key The key to look up
     * @returns The stored value or null if not found
     */
    getItem(key: string): string | null;

    /**
     * Stores a value with the given key
     * @param key The key to store under
     * @param value The value to store
     */
    setItem(key: string, value: string): void;

    /**
     * Removes the value associated with the given key
     * @param key The key to remove
     */
    removeItem(key: string): void;

    /**
     * Checks if the storage is available and working
     * @returns true if storage is available and working
     */
    isAvailable?(): boolean;
}

/**
 * Helper function to check if storage is available and working
 */
export function isStorageAvailable(storage: Storage | undefined): storage is Storage {
    if (!storage) return false;
    try {
        return typeof storage.isAvailable === 'function'
            ? storage.isAvailable()
            : true; // If isAvailable is not implemented, assume storage is available
    } catch {
        return false;
    }
}

/**
 * Type for the result of a safe storage operation
 */
export type StorageOperationResult<T> =
    | { success: true; result: T }
    | { success: false; error: Error };

/**
 * Helper function to safely perform storage operations
 */
export function safeStorageOperation<T>(
    operation: () => T,
    errorMessage: string
): StorageOperationResult<T> {
    try {
        const result = operation();
        return { success: true, result };
    } catch (error) {
        console.error(errorMessage, error);
        return {
            success: false,
            error: error instanceof Error ? error : new Error(errorMessage)
        };
    }
} 