import * as React from 'react'
import { MonthView, useDateLibAdapter, Text } from '@v-uik/base'
import { externalAriaProps } from './common'

export const MonthViewStory = (): JSX.Element => {
  const [date, setDate] = React.useState<Date | null>(null)
  const dateAdapter = useDateLibAdapter<Date>()
  const formattedDate = date
    ? dateAdapter.formatByString(date, 'LLLL yyyy')
    : ''

  return (
    <>
      <MonthView
        value={date}
        onChange={setDate}
        {...externalAriaProps.monthViewProps}
      />

      <Text style={{ marginTop: 16 }}>
        {`выбранный месяц: ${formattedDate}`}
      </Text>
    </>
  )
}
