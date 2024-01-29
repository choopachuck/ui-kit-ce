import React from 'react'
import { DateTimePicker } from '@v-uik/date-picker'

export default () => {
  const [date, setDate] = React.useState<Date | null>(null)

  const handleChange = React.useCallback(
    (value) => {
      setDate(value)
    },
    [setDate]
  )

  return (
    <DateTimePicker
      label="DateTime Picker"
      format="dd.MM.yy HH:mm"
      value={date}
      mask="11.11.11 11:11"
      inputProps={{
        inputProps: { id: 'date-time-picker' },
        placeholder: 'DD.MM.YYYY hh:mm',
      }}
      labelProps={{ htmlFor: 'date-time-picker' }}
      onChange={handleChange}
    />
  )
}
