import { ApiCaller, createChat, createConfig } from "@core/client";
import { ConfigInstance } from "@core/client/config";
import { Platform } from "@core/platform";
import { User } from "@core/types";

export function getTestUser(): User {
  return {
    email: "test@open.cx",
    name: "testing contact",
    external_id: "test@open.cx",
    customData: {
      env: "test",
      fa7lawyIsTesting: "true",
    },
  };
}

export function initilize(_config?: ConfigInstance, _platform?: Platform) {
  const openToken = "fe8f11971f5de916ab745d9c0408c7ef";
  const mockedStorage = new Map();

  const config =
    _config ||
    createConfig(
      {
        token: openToken,
        user: getTestUser(),
      },
      {
        env: {
          platform: "test",
        },
      },
    );

  const apis = new ApiCaller({
    config: config.getConfig(),
  });

  const chat = createChat({
    api: apis,
    config: config,
    platform: config.platform,
  });

  return {
    apis,
    chat,
    mockedStorage,
  };
}
