import * as React from 'react'
import { DatePicker, Button } from '@v-uik/base'
import { externalAriaProps } from './common'

const inputProps = {
  placeholder: 'дд.мм.гггг',
}

export const RenderInputStory = (): JSX.Element => {
  const [date, setDate] = React.useState<Date | null>(null)

  return (
    <DatePicker
      value={date}
      mask="11.11.1111"
      inputProps={inputProps}
      calendarViewExternalProps={externalAriaProps}
      renderInput={({ value }) => (
        <Button>{value ? value : 'Выбрать дату'}</Button>
      )}
      onChange={setDate}
    />
  )
}
