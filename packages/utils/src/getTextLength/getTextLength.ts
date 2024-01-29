/**
 * Функция подсчета количества символов с возможностью передать максимальное количество,
 * При передаче maxLength, количество символов отображается через /
 *
 * @param value - значение, количество символов которого будет считаться
 * @param maxLength - опционально, максимально возможное количество символов, для отображения через /
 * @returns - количество символов, или "количество символов / максимальное количество символов"
 */
export function getTextLength(
  value?: React.ReactText,
  maxLength?: number
): string {
  const count = String(value ?? '').length

  if (maxLength === undefined) {
    return count.toString()
  }

  return `${count} / ${maxLength}`
}
