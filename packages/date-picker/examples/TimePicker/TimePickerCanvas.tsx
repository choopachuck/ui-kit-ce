import React from 'react'
import { TimePicker, TimePickerProps } from '@v-uik/date-picker'

const validationErrorMessages: TimePickerProps['validationErrorMessages'] = {
  invalidTime: 'Некорректное время',
  notAllowedTime: 'Время недоступно для выбора',
}

export default () => {
  const [date, setDate] = React.useState<Date | null>(null)

  return (
    <TimePicker
      label="TimePicker"
      labelProps={{
        htmlFor: 'basic-time-picker',
      }}
      value={date}
      mask="11:11:11"
      format="HH:mm:ss"
      validationErrorMessages={validationErrorMessages}
      baseTimePickerProps={{
        views: ['hours', 'minutes', 'seconds'],
      }}
      inputProps={{
        placeholder: 'hh:mm:ss',
        inputProps: {
          id: 'basic-time-picker',
        },
      }}
      onChange={setDate}
    />
  )
}
