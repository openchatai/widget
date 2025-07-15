export function isExhaustive(value: never, funcName: string) {
  console.error(`Missing case for ${value} in ${funcName}`);
}
