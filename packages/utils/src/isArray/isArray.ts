/**
 * Проверяет переданное значение, что оно является Array
 */
export const isArray = <T>(value: T): value is T => {
  return Array.isArray(value)
}
