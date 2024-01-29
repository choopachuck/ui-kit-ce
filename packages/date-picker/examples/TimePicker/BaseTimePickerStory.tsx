import * as React from 'react'
import { Text } from '@v-uik/typography'
import { BaseTimePicker, useDateLibAdapter } from '@v-uik/date-picker'

export const BaseTimePickerStory = (): JSX.Element => {
  const [date, setDate] = React.useState<Date | null>(null)
  const dateAdapter = useDateLibAdapter<Date>()
  const time = date ? dateAdapter.formatByString(date, 'HH:mm') : ''

  return (
    <>
      <BaseTimePicker value={date} onChange={setDate} />

      <Text style={{ marginTop: 16 }}>{`выбранное время: ${time}`}</Text>
    </>
  )
}
