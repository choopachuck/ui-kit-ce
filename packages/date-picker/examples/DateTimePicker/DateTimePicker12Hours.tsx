import * as React from 'react'
import { DateLibAdapterProvider, DateTimePicker } from '@v-uik/date-picker'
import { externalAriaProps } from '../common'
import DateFnsAdapter from '@date-io/date-fns'
import enUS from 'date-fns/locale/en-US'

const inputProps = {
  placeholder: 'DD.MM.YYYY hh:mm:ss a',
}

export const DateTimePicker12Hours = (): React.ReactElement => {
  const [date, setDate] = React.useState<Date | null>(null)

  return (
    <DateLibAdapterProvider
      dateAdapter={DateFnsAdapter}
      options={{
        locale: enUS,
        formats: { weekdayShort: 'EEEEEE', monthShort: 'LLL' },
      }}
    >
      <DateTimePicker
        format="dd.MM.yy hh:mm:ss a"
        value={date}
        mask="11.11.11 11:11"
        calendarViewExternalProps={externalAriaProps}
        inputProps={inputProps}
        timePickerProps={{
          views: ['hours', 'minutes', 'seconds'],
          is12HoursFormat: true,
        }}
        onChange={setDate}
      />
    </DateLibAdapterProvider>
  )
}
