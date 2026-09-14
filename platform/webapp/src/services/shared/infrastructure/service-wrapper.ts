export function makeService<T extends Record<string, unknown>>(
  raw: T,
  _domain?: string,
): T {
  return raw;
}
