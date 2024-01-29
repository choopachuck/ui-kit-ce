import { parse } from './color-parse'

/**
 * Функция замены альфа-канала для rgb цветов
 *
 * ```ts
 * const color = setAlphaChannel('rgba(100, 200, 300, .4)', 1)
 * // rgba(100, 200, 300, 1)
 * ```
 *
 * @param color исходный rgb-цвет
 * @param value новый альфа-канал
 */
export function setAlphaChannel(color: string | number, value = 1): string {
  const { space, values } = parse(color)

  // TODO сделать универсальную функцию конвертер
  if (space === undefined || space !== 'rgb') {
    return String(color)
  }

  return `${space}a(${values.join(', ')}, ${value})`
}
