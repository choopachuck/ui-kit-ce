import React from 'react'
import { TimePicker, TimePickerProps } from '@v-uik/date-picker'

const validationErrorMessages: TimePickerProps['validationErrorMessages'] = {
  invalidTime: 'Некорректное время',
  notAllowedTime: 'Время недоступно для выбора',
  isAfterEndTime: 'Время начала позже времени конца',
  isBeforeStartTime: 'Время конца раньше времени начала',
}

export default () => {
  const [date, setDate] = React.useState<
    [Date | null | number, Date | null | number]
  >([null, null])

  return (
    <TimePicker.RangePicker
      value={date}
      label="TimeRange Picker"
      labelProps={{
        htmlFor: 'basic-time-range-picker',
      }}
      mask="11:11:11"
      format="HH:mm:ss"
      startInputProps={{
        placeholder: 'hh:mm:ss',
        inputProps: {
          id: 'basic-time-range-picker',
        },
      }}
      endInputProps={{ placeholder: 'hh:mm:ss' }}
      validationErrorMessages={validationErrorMessages}
      startTimePickerProps={{ views: ['hours', 'minutes', 'seconds'] }}
      endTimePickerProps={{ views: ['hours', 'minutes', 'seconds'] }}
      onChange={setDate}
    />
  )
}
