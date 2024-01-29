import { normalizeRange, Range } from '../normalizeRange'

/**
 * Конвертирует процент в значение между переданными границами.
 *
 * @example
 * min = 0;
 * max = 50;
 * 50% от этой границы будет 25
 */
export const percentToValue = (percent: number, range: Range = {}): number => {
  const { min, max } = normalizeRange(range)

  return ((max - min) * percent) / 100 + min
}
