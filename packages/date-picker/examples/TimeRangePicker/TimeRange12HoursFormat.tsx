import * as React from 'react'
import {
  DateLibAdapterProvider,
  TimePicker,
  TimePickerProps,
} from '@v-uik/date-picker'
import DateFnsAdapter from '@date-io/date-fns'
import enUS from 'date-fns/locale/en-US'

const validationErrorMessages: TimePickerProps['validationErrorMessages'] = {
  invalidTime: 'Некорректное время',
  notAllowedTime: 'Время недоступно для выбора',
  isAfterEndTime: 'Время начала позже времени конца',
  isBeforeStartTime: 'Время конца раньше времени начала',
}

export const TimeRange12HoursFormat = (): React.ReactElement => {
  const [date, setDate] = React.useState<[Date | null, Date | null]>([
    null,
    null,
  ])

  const handleChange = React.useCallback(
    (value) => {
      setDate(value)
    },
    [setDate]
  )

  return (
    <DateLibAdapterProvider
      dateAdapter={DateFnsAdapter}
      options={{
        locale: enUS,
        formats: { weekdayShort: 'EEEEEE', monthShort: 'LLL' },
      }}
    >
      <div style={{ display: 'flex' }}>
        <TimePicker.RangePicker
          is12HoursFormat
          validationErrorMessages={validationErrorMessages}
          value={date}
          mask="11:11 AA"
          format="hh:mm a"
          startInputProps={{ placeholder: 'hh:mm аа' }}
          endInputProps={{ placeholder: 'hh:mm аа' }}
          onChange={handleChange}
        />
      </div>
    </DateLibAdapterProvider>
  )
}
