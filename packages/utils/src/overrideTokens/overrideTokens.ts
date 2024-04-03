export const overrideTokens = <T extends Record<string, string | number>>(
  base: T,
  overrides: Partial<T>
): T => {
  return Object.keys(base).reduce((acc, key) => {
    const overrideValue = overrides[key]
    const resolvedValue =
      overrideValue || overrideValue === 0 ? overrideValue : base[key]

    return {
      ...acc,
      [key]: resolvedValue,
    }
  }, {} as T)
}
