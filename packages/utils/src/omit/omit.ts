/**
 * Исключает из объекта переданное поле или набор полей.
 * @param {object} target - объект, из которого необходимо удалить поля.
 * @param {string|string[]} paths - поле или список полей.
 * @returns {object} новый объект (поверхностное копирование) без переданных полей.
 */
export const omit = <T = Record<string, unknown>>(
  target: T,
  paths: string | string[]
): Partial<T> => {
  const enhancedPaths = Array.isArray(paths) ? paths : [paths]
  const result = {} as T

  for (const key in target) {
    // https://eslint.org/docs/rules/no-prototype-builtins
    if (Object.prototype.hasOwnProperty.call(target, key)) {
      if (!enhancedPaths.includes(key)) {
        result[key] = target[key]
      }
    }
  }

  return result
}
