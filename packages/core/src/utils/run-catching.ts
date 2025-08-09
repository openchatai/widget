export function run<T>(fn: () => T): T {
  return fn();
}

export type Result<T, E> =
  | { data: T; error?: undefined }
  | { data?: undefined; error: E };

/**
 * Many thanks to @m-tabaza for this utility... Kotlin vibes
 */
export function runCatching<T, E = unknown>(
  callback: () => Promise<T>,
): Promise<Result<T, E>>;
export function runCatching<T, E = unknown>(callback: () => T): Result<T, E>;
export function runCatching<T, E = unknown>(
  callback: () => T | Promise<T>,
): Result<T, E> | Promise<Result<T, E>> {
  try {
    const result = callback();

    if (result instanceof Promise) {
      return result.then((data) => ({ data })).catch((error: E) => ({ error }));
    }

    return { data: result };
  } catch (error) {
    return { error: error as E };
  }
}
