export * from './common'
export * from './date'
export type { BaseRangePickerProps, TRangeDate, TRangeValue } from './range'

export const PartsOfRangeDate = {
  start: 'start',
  end: 'end',
} as const

export type NullableDate<TDate> = TDate | null
export type RangeDate<TDate> = [NullableDate<TDate>, NullableDate<TDate>]

export const RangeCalendarPickerViews = {
  yearAndMonth: 'yearAndMonth',
  day: 'day',
} as const

export const CalendarPickerViews = {
  day: 'day',
  month: 'month',
  year: 'year',
} as const

export type CalendarPickerViewsKeys = keyof typeof CalendarPickerViews
