// Sorry

function parseJSON(jsonString: string): Record<string, unknown> | null {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    return null;
  }
}

function isJSONString(value: string): boolean {
  return (
    (value.startsWith("{") && value.endsWith("}")) ||
    (value.startsWith("[") && value.endsWith("]"))
  );
}

function parseNestedJSON(obj: Record<string, unknown>): void {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      let value = obj[key];
      if (typeof value === "string" && isJSONString(value)) {
        try {
          value = JSON.parse(value);
          obj[key] = value;
        } catch {
          continue;
        }
      }
      if (typeof value === "object" && value !== null) {
        if (Array.isArray(value)) {
          value.forEach((item, index) => {
            if (typeof item === "string" && isJSONString(item)) {
              try {
                value[index] = JSON.parse(item);
                parseNestedJSON(value[index] as Record<string, unknown>);
              } catch {
                // Skip nested parsing errors
              }
            } else if (typeof item === "object" && item !== null) {
              parseNestedJSON(item as Record<string, unknown>);
            }
          });
        } else {
          parseNestedJSON(value as Record<string, unknown>);
        }
      }
    }
  }
}

export function decodeJSON<T extends Record<string, unknown>>(
  jsonString: string,
): T | null {
  const parsed = parseJSON(jsonString);
  if (parsed && typeof parsed === "object") {
    parseNestedJSON(parsed);
    return parsed as T;
  }
  return null;
}



if (import.meta.vitest) {
  const { describe, expect, it } = import.meta.vitest;

  describe("decodeJSON", () => {
    it("should parse a valid JSON string", () => {
      const jsonString = '{"name":"John","age":30}';
      const result = decodeJSON(jsonString);
      expect(result).toEqual({ name: "John", age: 30 });
    });

    it("should parse nested JSON strings", () => {
      const jsonString =
        '{"name":"John","details":"{\\"age\\":30,\\"city\\":\\"New York\\"}"}';
      const result = decodeJSON(jsonString);
      expect(result).toEqual({
        name: "John",
        details: { age: 30, city: "New York" },
      });
    });

    it("should return null for invalid JSON string", () => {
      const jsonString = '{name:"John",age:30}';
      const result = decodeJSON(jsonString);
      expect(result).toBeNull();
    });

    it("should handle empty JSON string", () => {
      const jsonString = "";
      const result = decodeJSON(jsonString);
      expect(result).toBeNull();
    });
    it("should handle non-JSON string", () => {
      const jsonString = "Hello, World!";
      const result = decodeJSON(jsonString);
      expect(result).toBeNull();
    });

    it("should handle arrays with nested JSON strings", () => {
      const jsonString =
        '{"data":["{\\"name\\":\\"John\\"}","{\\"name\\":\\"Doe\\"}"]}';
      const result = decodeJSON(jsonString);
      expect(result).toEqual({ data: [{ name: "John" }, { name: "Doe" }] });
    });
  });

}