import * as React from 'react'
import { RangeYearView, useDateLibAdapter, Text } from '@v-uik/base'

export const RangeYearViewStory = (): JSX.Element => {
  const [date, setDate] = React.useState<[Date | null, Date | null]>([
    null,
    null,
  ])
  const [dateToBeChanged, setDateToBeChanged] = React.useState<'start' | 'end'>(
    'start'
  )
  const dateAdapter = useDateLibAdapter<Date>()
  const formattedStartDate = date[0]
    ? dateAdapter.formatByString(date[0], 'yyyy')
    : '...'
  const formattedEndDate = date[1]
    ? dateAdapter.formatByString(date[1], 'yyyy')
    : '...'

  const onChange = (value: Date) => {
    const changedDate = dateAdapter.setRangeDate(dateToBeChanged, date, value)
    setDate(changedDate)
    const nextDateToBeChanged = dateAdapter.getNextDateToBeChanged(
      dateToBeChanged,
      changedDate
    )
    setDateToBeChanged(nextDateToBeChanged)
  }

  return (
    <>
      <RangeYearView<Date>
        value={date}
        dateToBeChanged={dateToBeChanged}
        onChange={onChange}
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
