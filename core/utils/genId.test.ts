import { describe, expect, it } from "vitest";
import { genId } from "./genId";

describe("genId", () => {
  it("should generate a random id", () => {
    const id = genId();
    expect(id).toBeTruthy();
  });

  it("should generate a random id with a specific length", () => {
    const id = genId(10);
    expect(id).toHaveLength(10);
  });

  it("should truly generate a random id several times", () => {
    const ids = Array.from({ length: 100 }, () => genId());
    expect(new Set(ids).size).toBe(ids.length);
  });
});
