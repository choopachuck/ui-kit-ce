export function pick<T extends Record<string, unknown>, K extends keyof T>(
  object: T,
  pickArg: K[]
): Pick<T, K>
export function pick<T extends Record<string, unknown>, RT>(
  object: T,
  regexp: RegExp
): RT
export function pick<T extends Record<string, unknown>, RT>(
  object: T,
  regexp: RegExp,
  replaceKey?: (v: string) => string
): RT
export function pick<T extends Record<string, unknown>, K extends keyof T>(
  object: T,
  pickArg: K[] | RegExp,
  replaceKey: (v: K) => string = (v) => v as string
): Record<string, unknown> {
  const result = {} as Record<string, unknown>
  if (Array.isArray(pickArg)) {
    for (const key of pickArg) {
      result[key as string] = object[key]
    }
  }

  for (const key of Object.keys(object)) {
    if (pickArg instanceof RegExp && key.match(pickArg)) {
      result[replaceKey(key as K)] = object[key]
    }
  }

  return result
}
