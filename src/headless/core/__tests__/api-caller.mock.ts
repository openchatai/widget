import { vi } from 'vitest';
import { TestUtils } from './test-utils';

vi.mock(import('../api/api-caller'), () => {
  const MockApiCaller = vi.fn();

  // Default mock return values for all methods
  for (const [name, mock] of Object.entries(TestUtils.mock.ApiCaller)) {
    mock(MockApiCaller, undefined);
    vi.spyOn(MockApiCaller.prototype, name);
  }

  return {
    ApiCaller: MockApiCaller,
  };
});
