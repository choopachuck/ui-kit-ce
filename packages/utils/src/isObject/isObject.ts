/**
 * Переданное значение является объектом, если typeof является object
 * и не является null
 */
export const isObject = <T>(value: T): value is T => {
  return typeof value === 'object' && value !== null
}
