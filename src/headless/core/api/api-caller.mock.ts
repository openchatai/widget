import { vi } from "vitest";
import { TestUtils } from "../utils/test-utils";

vi.mock(import("./api-caller"), () => {
  const MockApiCaller = vi.fn();

  // Default mock return values for all methods
  for (const mock of Object.values(TestUtils.mock.ApiCaller)) {
    mock(MockApiCaller, undefined);
  }

  return {
    ApiCaller: MockApiCaller,
  };
});
