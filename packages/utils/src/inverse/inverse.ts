/**
 * Инвертирует значения ключей в переданном объекте.
 * Так значение первого ключа становится значением последнего,
 * а значение последнего становится значением первого.
 * Если функции будет передано значение, отличное от объекта,
 * будет возвращено это же значение без изменения.
 *
 * @example
 * inverse({
 *     key: 'value',
 *     key1: true,
 *     key2: 1,
 *     key3: null,
 * });
 *
 * // returns:
 * // {
 * //     key: null,
 * //     key1: 1,
 * //     key2: true,
 * //     key3: 'value',
 * // }
 *
 * В итоговом типе каждый ключ целевого объекта будет иметь
 * все множество типов всех ключей целевого объекта
 *
 * type {
 *   key: null | boolean | number | string,
 *   key1: null | boolean | number | string,
 *   key2: null | boolean | number | string,
 *   key3: null | boolean | number | string,
 * }
 */
export const inverse = <T>(target: T): T | Record<keyof T, T[keyof T]> => {
  if (
    Array.isArray(target) ||
    !(typeof target === 'object' && target !== null)
  ) {
    return target
  }

  const result = { ...target } as Record<string, unknown>
  const keys = Object.keys(target)

  while (keys.length > 1) {
    /* eslint-disable */
    /**
     * TypeScript не может гарантировать, что во время компиляции, массив не будет пустой,
     * поэтому определяет метод pop() как:
     *
     * pop(): T | undefined;
     *
     * Но в нашем случае мы уверены, что в объекте будет минимум 2 ключа
     */
    const lastKey = keys.pop()!
    const firstKey = keys.shift()!

    // @ts-ignore вернуться позже
    result[lastKey] = target[firstKey]
    // @ts-ignore вернуться позже
    result[firstKey] = target[lastKey]
    /* eslint-enable */
  }

  /**
   * Самое простое, это сказать что после перестановки, каждое значение будет
   * иметь все множество значений целевого объекта
   */
  return result as Record<keyof T, T[keyof T]>
}
