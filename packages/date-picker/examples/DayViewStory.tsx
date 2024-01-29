import * as React from 'react'
import { DayView, useDateLibAdapter, Text } from '@v-uik/base'
import { externalAriaProps } from './common'

export const DayViewStory = (): JSX.Element => {
  const [date, setDate] = React.useState<Date | null>(null)
  const dateAdapter = useDateLibAdapter<Date>()
  const formattedDate = date
    ? dateAdapter.formatByString(date, 'dd.MM.yyyy')
    : ''

  return (
    <>
      <DayView
        style={{ display: 'inline-block' }}
        value={date}
        onChange={setDate}
        {...externalAriaProps.dayViewProps}
      />

      <Text style={{ marginTop: 16 }}>
        {`выбранная дата: ${formattedDate}`}
      </Text>
    </>
  )
}
