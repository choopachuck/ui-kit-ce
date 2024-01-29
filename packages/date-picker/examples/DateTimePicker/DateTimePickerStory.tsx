import * as React from 'react'
import { DateTimePicker } from '@v-uik/date-picker'
import { externalAriaProps } from '../common'

const inputProps = {
  placeholder: 'DD.MM.YYYY hh:mm',
}

export const DateTimePickerStory = (): React.ReactElement => {
  const [date, setDate] = React.useState<Date | null>(null)

  const handleChange = React.useCallback(
    (value) => {
      setDate(value)
    },
    [setDate]
  )

  return (
    <DateTimePicker
      format="dd.MM.yy HH:mm"
      value={date}
      calendarViewExternalProps={externalAriaProps}
      mask="11.11.11 11:11"
      inputProps={inputProps}
      onChange={handleChange}
    />
  )
}
