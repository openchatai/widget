import { describe, expect, it } from 'vitest';
import { decodeJSON } from './parseJson';

describe('decodeJSON', () => {

    it('should parse a valid JSON string', () => {
        const jsonString = '{"name":"John","age":30}';
        const result = decodeJSON(jsonString);
        expect(result).toEqual({ name: 'John', age: 30 });
    });

    it('should parse nested JSON strings', () => {
        const jsonString = '{"name":"John","details":"{\\"age\\":30,\\"city\\":\\"New York\\"}"}';
        const result = decodeJSON(jsonString);
        expect(result).toEqual({ name: 'John', details: { age: 30, city: 'New York' } });
    });

    it('should return null for invalid JSON string', () => {
        const jsonString = '{name:"John",age:30}';
        const result = decodeJSON(jsonString);
        expect(result).toBeNull();
    });

    it('should handle empty JSON string', () => {
        const jsonString = '';
        const result = decodeJSON(jsonString);
        expect(result).toBeNull();
    });
    it('should handle non-JSON string', () => {
        const jsonString = 'Hello, World!';
        const result = decodeJSON(jsonString);
        expect(result).toBeNull();
    });

    it('should handle arrays with nested JSON strings', () => {
        const jsonString = '{"data":["{\\"name\\":\\"John\\"}","{\\"name\\":\\"Doe\\"}"]}';
        const result = decodeJSON(jsonString);
        expect(result).toEqual({ data: [{ name: 'John' }, { name: 'Doe' }] });
    });
});