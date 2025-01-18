import { describe, it } from "vitest";
import { initilize } from "../test-utils";
import { createConfig } from "core/client";

describe("create contact", () => {
  const platform = {
    env: {
      platform: "test",
    },
  };

  const config = createConfig(
    {
      token: "fe8f11971f5de916ab745d9c0408c7ef",
    },
    platform,
  );

  const { chat } = initilize(config, platform);

  it("should create contact", () => {
    //
  });
});
