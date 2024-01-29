import { useDateLibAdapter } from './useDateLibAdapter'

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

  if (!date) {
    return placeholder
  }

  try {
    const adapterDate = adapter.date(date) as TDate

    if (format === 'keyboardDate') {
      return adapter.format(adapterDate, format)
    }

    return adapter.formatByString(adapterDate, format)
  } catch (e) {
    return placeholder
  }
}
