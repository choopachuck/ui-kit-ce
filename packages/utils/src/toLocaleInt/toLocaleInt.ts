/**
 * Приведение к локали целой части числа.
 * @example
 * toLocaleInt('123456', '.') // 123.456
 * toLocaleInt('123456', ' ') // 123 456
 * toLocaleInt('1234567', ',') // 1,234,567
 *
 * @param int - Целая часть числа
 * @param groupSeparator - Групповой разделитель
 */
export const toLocaleInt = (int: string, groupSeparator: string): string => {
  if (!groupSeparator) {
    return int
  }

  const localized = int
    .split('')
    .reverse()
    .join('')
    .replace(/([0-9]{3})/g, `$1${groupSeparator}`)
    .split('')
    .reverse()
    .join('')

  return localized.startsWith(groupSeparator) ? localized.slice(1) : localized
}
