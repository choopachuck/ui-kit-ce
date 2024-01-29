import * as React from 'react'
import { RangeCalendarPicker, useDateLibAdapter, Text } from '@v-uik/base'

export const RangeCalendarPickerStory = (): JSX.Element => {
  const [date, setDate] = React.useState<[Date | null, Date | null]>([
    null,
    null,
  ])
  const dateAdapter = useDateLibAdapter<Date>()
  const formattedStartDate = `${
    date[0] ? dateAdapter.formatByString(date[0], 'dd.MM.y') : '...'
  }`
  const formattedEndDate = `${
    date[1] ? dateAdapter.formatByString(date[1], 'dd.MM.y') : '...'
  }`

  return (
    <>
      <RangeCalendarPicker value={date} onChange={setDate} />
      <Text
        style={{ marginTop: 16 }}
      >{`выбранный период: ${formattedStartDate} - ${formattedEndDate}`}</Text>
    </>
  )
}
