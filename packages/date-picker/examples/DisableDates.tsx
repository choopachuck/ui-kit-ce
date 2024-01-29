import * as React from 'react'
import { DatePicker } from '@v-uik/base'
import { externalAriaProps } from './common'

const inputProps = {
  placeholder: 'дд.мм.гггг',
}

const isDisabledDate = (date: Date | null) => {
  return !!date && date.getTime() < Date.now()
}

export const DisableDatesStory = (): React.ReactElement => {
  const [date, setDate] = React.useState<Date | null>(null)

  const handleChange = React.useCallback(
    (value) => {
      setDate(value)
    },
    [setDate]
  )

  return (
    <DatePicker
      classes={{
        root: 'hello',
      }}
      value={date}
      mask="11.11.1111"
      inputProps={inputProps}
      next_shouldDisableDate={isDisabledDate}
      calendarViewExternalProps={externalAriaProps}
      onChange={handleChange}
    />
  )
}
