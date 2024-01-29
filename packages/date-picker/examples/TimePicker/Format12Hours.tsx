import * as React from 'react'
import {
  DateLibAdapterProvider,
  TimePicker,
  TimePickerProps,
} from '@v-uik/date-picker'

import enUS from 'date-fns/locale/en-US'
import DateFnsAdapter from '@date-io/date-fns'

const validationErrorMessages: TimePickerProps['validationErrorMessages'] = {
  invalidTime: 'Некорректное время',
  notAllowedTime: 'Время недоступно для выбора',
}

export const Format12Hours = (): JSX.Element => {
  const [date, setDate] = React.useState<Date | null>(null)

  return (
    <DateLibAdapterProvider
      dateAdapter={DateFnsAdapter}
      options={{
        locale: enUS,
        formats: { weekdayShort: 'EEEEEE', monthShort: 'LLL' },
      }}
    >
      <div style={{ display: 'flex' }}>
        <TimePicker
          value={date}
          mask="11:11:11 aa"
          label="Label"
          validationErrorMessages={validationErrorMessages}
          format="hh:mm:ss a"
          labelProps={{
            id: 'label-13',
          }}
          baseTimePickerProps={{
            views: ['hours', 'minutes', 'seconds'],
            is12HoursFormat: true,
          }}
          inputProps={{
            placeholder: 'hh:mm:ss aa',
            inputProps: { 'aria-labelledby': 'label-13' },
          }}
          onChange={setDate}
        />
      </div>
    </DateLibAdapterProvider>
  )
}
