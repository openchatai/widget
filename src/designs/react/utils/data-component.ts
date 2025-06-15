import type { OpenCxComponentNameU } from '../../../headless/core';

/**
 * A silly util to help with the component name type safety.
 */
export function dc(componentName: OpenCxComponentNameU) {
  return { 'data-component': componentName };
}
