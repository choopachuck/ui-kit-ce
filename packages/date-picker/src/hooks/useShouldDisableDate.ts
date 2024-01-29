import {
  ValidateDateProps,
  CalendarPickerViewsKeys,
  CalendarPickerViews,
} from '../interfaces'
import { CustomUtils } from '../utils/customDateLibAdapter'
import { useCallback } from 'react'

export type ShouldDisableDateFunction<TDate> = (
  date: TDate,
  view?: CalendarPickerViewsKeys
) => boolean

/**
 * Возращает функцию, учитывающую все пропсы для выключения дат, месяцев, годов
 */
export const useShouldDisableDate = <TDate>(
  adapter: CustomUtils<TDate>,
  {
    maxDate,
    minDate,
    shouldDisableDate: shouldDisableDateProp,
    disablePast,
    disableFuture,
    next_shouldDisableDate,
    next_shouldDisableMonth,
    next_shouldDisableYear,
  }: ValidateDateProps<TDate>
): ShouldDisableDateFunction<TDate> => {
  return useCallback(
    (date, unit = CalendarPickerViews.day) => {
      if (unit === CalendarPickerViews.year) {
        if (maxDate && adapter.isAfterYear(date, maxDate)) {
          return true
        }

        if (minDate && adapter.isBeforeYear(date, minDate)) {
          return true
        }

        if (next_shouldDisableYear) {
          return next_shouldDisableYear(date)
        }
      } else if (unit === CalendarPickerViews.month) {
        if (
          maxDate &&
          adapter.isAfter(date, maxDate) &&
          !adapter.isSameMonth(date, maxDate)
        ) {
          return true
        }

        if (
          minDate &&
          adapter.isBefore(date, minDate) &&
          !adapter.isSameMonth(date, minDate)
        ) {
          return true
        }

        if (next_shouldDisableYear && next_shouldDisableYear(date)) {
          return true
        }

        if (next_shouldDisableMonth) {
          return next_shouldDisableMonth(date)
        }
      } else {
        if (maxDate && adapter.isAfterDay(date, maxDate)) {
          return true
        }

        if (minDate && adapter.isBeforeDay(date, minDate)) {
          return true
        }

        if (next_shouldDisableYear && next_shouldDisableYear(date)) {
          return true
        }

        if (next_shouldDisableMonth && next_shouldDisableMonth(date)) {
          return true
        }

        if (next_shouldDisableDate) {
          return next_shouldDisableDate(date)
        }
      }

      if (shouldDisableDateProp && shouldDisableDateProp(date)) {
        return true
      }

      const currentDate = adapter.date()

      // TODO: @deprecated
      if (disablePast && currentDate) {
        return adapter.isAfter(adapter.addDays(currentDate, -1), date)
      }

      // TODO: @deprecated
      if (disableFuture && currentDate) {
        return adapter.isBefore(currentDate, date)
      }

      return false
    },
    [
      adapter,
      maxDate,
      minDate,
      shouldDisableDateProp,
      disablePast,
      disableFuture,
      next_shouldDisableDate,
      next_shouldDisableMonth,
      next_shouldDisableYear,
    ]
  )
}
