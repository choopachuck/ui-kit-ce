import { useDateLibAdapter } from './useDateLibAdapter'
import { formatDate } from '../utils/date'

/**
 * Определяет стандартное поведение для форматирования даты в поле ввода
 * времени при пустом свойстве format.
 */
export const useFormat = <TDate = unknown>(
  date: Date | TDate,
  format = 'keyboardDate',
  placeholder = ''
): string => {
  const adapter = useDateLibAdapter<TDate>()

  return formatDate(adapter, date, format, placeholder)
}
