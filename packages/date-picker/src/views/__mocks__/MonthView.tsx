import * as React from 'react'
import { MonthViewProps } from '../MonthView'
import { CalendarPickerViews } from '../../interfaces'
import { useDateLibAdapter } from '../..'

export const MonthView = (
  props: Partial<MonthViewProps<unknown>>
): JSX.Element => {
  const { value, onChange } = props
  const adapter = useDateLibAdapter()
  const newDate = adapter.date(new Date(2021, 1, 2))

  return (
    <button
      type="button"
      onClick={() => {
        onChange?.(newDate)
      }}
    >
      {CalendarPickerViews.month} -{' '}
      {value ? adapter.toJsDate(value).toISOString() : ''}
    </button>
  )
}
