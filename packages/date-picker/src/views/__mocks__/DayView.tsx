import * as React from 'react'
import { DayViewProps } from '../DayView'
import { CalendarPickerViews } from '../../interfaces'
import { useDateLibAdapter } from '../..'

export const DayView = (props: Partial<DayViewProps<unknown>>): JSX.Element => {
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
      {CalendarPickerViews.day} -{' '}
      {value ? adapter.toJsDate(value).toISOString() : ''}
    </button>
  )
}
