import { describe, it, expect, vi } from 'vitest';
import { isStorageAvailable, safeStorageOperation } from '../../platform/storage';

describe('Storage Utilities', () => {
    describe('isStorageAvailable', () => {
        it('should return false for undefined storage', () => {
            expect(isStorageAvailable(undefined)).toBe(false);
        });

        it('should return true for valid storage object', () => {
            const mockStorage = {
                getItem: vi.fn(),
                setItem: vi.fn(),
                removeItem: vi.fn()
            };
            expect(isStorageAvailable(mockStorage)).toBe(true);
        });
    });

    describe('safeStorageOperation', () => {
        it('should handle successful operation', async () => {
            const operation = async () => 'success';
            const result = await safeStorageOperation(operation, 'Test operation');

            expect(result).toEqual({
                success: true,
                result: 'success',
                error: null
            });
        });

        it('should handle operation error', async () => {
            const error = new Error('Operation failed');
            const operation = async () => { throw error; };
            const result = await safeStorageOperation(operation, 'Test operation');

            expect(result).toEqual({
                success: false,
                result: null,
                error: {
                    message: 'Operation failed',
                    code: 'STORAGE_OPERATION_FAILED',
                    context: 'Test operation'
                }
            });
        });

        it('should handle non-Error exceptions', async () => {
            const operation = async () => { throw 'String error'; };
            const result = await safeStorageOperation(operation, 'Test operation');

            expect(result).toEqual({
                success: false,
                result: null,
                error: {
                    message: 'String error',
                    code: 'STORAGE_OPERATION_FAILED',
                    context: 'Test operation'
                }
            });
        });

        it('should handle undefined error message', async () => {
            const operation = async () => { throw new Error(); };
            const result = await safeStorageOperation(operation, 'Test operation');

            expect(result).toEqual({
                success: false,
                result: null,
                error: {
                    message: 'Unknown error',
                    code: 'STORAGE_OPERATION_FAILED',
                    context: 'Test operation'
                }
            });
        });
    });
}); 