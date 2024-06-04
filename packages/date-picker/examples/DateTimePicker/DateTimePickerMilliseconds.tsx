import React from 'react'
import { DateTimePicker } from '@v-uik/date-picker'
import { externalAriaProps } from '../common'

const inputProps = {
  placeholder: 'DD.MM.YYYY hh:mm:ss.fff',
}

export const DateTimePickerMilliseconds: React.FC = () => {
  const [date, setDate] = React.useState<Date | null>(null)

  return (
    <DateTimePicker
      format="dd.MM.yy HH:mm:ss.SSS"
      value={date}
      mask="11.11.11 11:11:11.111"
      calendarViewExternalProps={externalAriaProps}
      timePickerProps={{
        views: ['hours', 'minutes', 'seconds', 'milliseconds'],
      }}
      inputProps={inputProps}
      onChange={setDate}
    />
  )
}
