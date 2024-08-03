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

export function decodeJSON<T extends Record<string, unknown>>(jsonString: string): T | null {
    const parsed = parseJSON(jsonString);
    if (parsed && typeof parsed === "object") {
        parseNestedJSON(parsed);
        return parsed as T;
    }
    return null;
}
