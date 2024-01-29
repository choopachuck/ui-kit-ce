import * as React from 'react'
import { YearViewProps } from '../YearView'
import { CalendarPickerViews } from '../../interfaces'
import { useDateLibAdapter } from '../..'

export const YearView = (
  props: Partial<YearViewProps<unknown>>
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
      {CalendarPickerViews.year} -{' '}
      {value ? adapter.toJsDate(value).toISOString() : ''}
    </button>
  )
}
