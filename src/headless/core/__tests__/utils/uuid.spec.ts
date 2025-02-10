import { genUuid } from "../../utils/uuid";
import { z } from "zod";

suite(genUuid.name, () => {
  it("should generate a uuid", () => {
    const uuid = genUuid();
    const schema = z.string().uuid();

    const parsed = schema.safeParse(uuid);

    expect(parsed.success).toBe(true);
  });
});
