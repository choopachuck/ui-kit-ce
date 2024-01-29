import * as React from 'react'
import { YearView, useDateLibAdapter, Text } from '@v-uik/base'
import { externalAriaProps } from './common'

export const YearViewStory = (): JSX.Element => {
  const [date, setDate] = React.useState<Date | null>(null)
  const dateAdapter = useDateLibAdapter<Date>()
  const formattedDate = date ? dateAdapter.formatByString(date, 'yyyy') : ''

  return (
    <>
      <YearView
        value={date}
        onChange={setDate}
        {...externalAriaProps.yearViewProps}
      />

      <Text style={{ marginTop: 16 }}>{`выбранный год: ${formattedDate}`}</Text>
    </>
  )
}
