import * as React from 'react'
import { RangeDayView, useDateLibAdapter, Text } from '@v-uik/base'

export const RangeDayViewStory = (): JSX.Element => {
  const [date, setDate] = React.useState<[Date | null, Date | null]>([
    null,
    null,
  ])
  const [dateToBeChanged, setDateToBeChanged] = React.useState<'start' | 'end'>(
    'start'
  )
  const dateAdapter = useDateLibAdapter<Date>()
  const formattedStartDate = date[0]
    ? dateAdapter.formatByString(date[0], 'dd.MM.yyyy')
    : '...'
  const formattedEndDate = date[1]
    ? dateAdapter.formatByString(date[1], 'dd.MM.yyyy')
    : '...'

  return (
    <>
      <RangeDayView
        value={date}
        dateToBeChanged={dateToBeChanged}
        onChange={setDate}
        onDateToBeChangedToggle={setDateToBeChanged}
      />

      <Text gutterBottom style={{ marginTop: 16 }}>
        {`текущая редактируемая часть периода: ${dateToBeChanged}`}
      </Text>

      <Text>
        {`выбранный период: ${formattedStartDate} - ${formattedEndDate}`}
      </Text>
    </>
  )
}
