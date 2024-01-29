/**
 * Функция для проверки совпадения длины паттерна формата
 * @param date - строка с датой
 * @param pattern - формат к которому она должна быть приведена
 */
export const isMatchYears = (date: string, pattern: string): boolean => {
  const localPattern = pattern.toLowerCase()

  const yearsLen = localPattern.split('y').length - 1

  if (yearsLen > 0) {
    const yearsIndex = localPattern.indexOf('y')
    const afterYears = date.slice(yearsIndex)
    const yearsMatch = afterYears.match(/^.\d+/)

    if (yearsMatch && yearsMatch[0].match(/\d+/)?.[0].length === yearsLen) {
      return true
    }

    return false
  }

  return true
}
