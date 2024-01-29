export const RawTypes = {
  null: 'null',
  array: 'array',
  string: 'string',
  number: 'number',
  regexp: 'regexp',
  object: 'object',
  function: 'function',
  undefined: 'undefined',
} as const

export type TRawTypes = keyof typeof RawTypes

/**
 * Вычисляет тип значения
 * @example
 * getRawType({}); // RawTypes.object -> 'object'
 * getRawType([]); // RawTypes.array -> 'array'
 *
 * @param {any} target
 * @returns {TRawTypes}
 */
export const getRawType = <T>(target: T): TRawTypes => {
  return Object.prototype.toString
    .call(target)
    .slice(8, -1)
    .toLowerCase() as TRawTypes
}
