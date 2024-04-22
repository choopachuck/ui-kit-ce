import * as React from 'react'
import { DatePicker } from '@v-uik/base'
import { externalAriaProps } from './common'

const inputProps = {
  placeholder: 'дд.мм.гггг',
}

export const BasicStory = (): React.ReactElement => {
  const [date, setDate] = React.useState<Date | null>(null)

  return (
    <DatePicker
      value={date}
      mask="11.11.1111"
      inputProps={inputProps}
      calendarViewExternalProps={externalAriaProps}
      onChange={setDate}
    />
  )
}
