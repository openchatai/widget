type JsonArray = JsonValue[];

type JsonObject = {
  [x: string]: JsonValue | undefined;
};

type JsonPrimitive = boolean | number | string | null;

export type JsonValue = JsonArray | JsonObject | JsonPrimitive;
