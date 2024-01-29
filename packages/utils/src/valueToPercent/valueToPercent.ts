import { normalizeRange, Range } from '../normalizeRange'

/**
 * Конвертирует значение в процент между переданными границами
 *
 * @example
 * min = 0;
 * max = 50;
 * Значение 50 от этой границы будет равно 100%
 */
export const valueToPercent = (
  value: number,
  range: Range | undefined = {}
): number => {
  const { min, max } = normalizeRange(range)

  if (value < min || value > max) {
    console.warn(`valueToPercent: 
            Переданное значение: ${value} находится за предлами min и max.
            Исправьте значение или границы.`)

    return 0
  }

  let percent = ((value - min) * 100) / (max - min)

  percent = Math.max(percent, 0)
  percent = Math.min(percent, 100)

  return percent
}
