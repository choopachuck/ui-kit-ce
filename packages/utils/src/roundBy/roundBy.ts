/**
 * Округляет значение (target) по переданному значению (value).
 */
export const roundBy = (target: number, value: number): number => {
  const pow = value.toString().split('.')[1]?.length
  const factor = pow ? Math.pow(10, pow) : 1
  const rounded = Math.round(target / value) * value

  // Повторное округление необходимо для решения проблемы: 0.1 + 0.2 != 0.3
  // Для этого высчитываем количество знаков после запятой
  // и округляем с учётом этого значения
  return Math.round(rounded * factor) / factor
}
