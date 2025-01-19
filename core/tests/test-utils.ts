import { ApiCaller } from "core/api";
import { createChat } from "core/context/chat";
import { WidgetConfig } from "core/types";

export function getTestUser() {
  return {
    email: "test@open.cx",
    name: "testing contact",
    external_id: "test@open.cx",
    customData: {
      env: "test",
      fa7lawyIsTesting: "true",
    },
  } satisfies WidgetConfig["user"];
}

export function initilize(_config?: WidgetConfig) {
  const openToken = "fe8f11971f5de916ab745d9c0408c7ef";
  const mockedStorage = new Map();

  const config: WidgetConfig = _config || {
    token: openToken,
    user: getTestUser(),
  };

  const apis = new ApiCaller({
    config: config,
  });

  const chat = createChat({
    api: apis,
    config: config,
  });

  return {
    apis,
    chat,
    mockedStorage,
  };
}
