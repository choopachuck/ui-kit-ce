import * as React from 'react'
import { RangePicker } from '@v-uik/base'
import { isWeekend } from 'date-fns'

type TRange = [Date | number, Date | number]

export const RestrictedDays = (): React.ReactElement => {
  const [range, setRange] = React.useState<TRange>()

  const handleDisableDate = (date: Date): boolean => {
    return isWeekend(date)
  }

  return (
    <RangePicker
      disableFuture
      value={range}
      mask="11.11.1111"
      next_shouldDisableDate={handleDisableDate}
      onChange={setRange}
    />
  )
}
