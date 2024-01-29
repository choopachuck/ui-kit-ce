import * as React from 'react'
import { CalendarPicker, useDateLibAdapter, Text } from '@v-uik/base'
import { externalAriaProps } from './common'

export const CalendarPickerStory = (): JSX.Element => {
  const [date, setDate] = React.useState<Date | null>(null)
  const dateAdapter = useDateLibAdapter<Date>()
  const formattedDate = date
    ? dateAdapter.formatByString(date, 'dd.MM.yyyy')
    : ''

  return (
    <>
      <CalendarPicker
        value={date}
        externalComponentsProps={externalAriaProps}
        onChange={() => null}
        onChangeDay={setDate}
      />

      <Text style={{ marginTop: 16 }}>
        {`выбранная дата: ${formattedDate}`}
      </Text>
    </>
  )
}
