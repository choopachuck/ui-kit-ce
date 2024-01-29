import * as React from 'react'
import { DatePicker } from '@v-uik/base'
import { addDays } from 'date-fns'
import { externalAriaProps } from './common'

const inputProps = {
  placeholder: 'дд.мм.гггг',
}

export const MinMaxDateStory = (): React.ReactElement => {
  const [date, setDate] = React.useState<Date | null>(null)

  return (
    <DatePicker
      label="Выберите дату"
      value={date}
      mask="11.11.1111"
      inputProps={inputProps}
      minDate={new Date()}
      maxDate={addDays(new Date(), 7)}
      calendarViewExternalProps={externalAriaProps}
      onChange={setDate}
    />
  )
}
