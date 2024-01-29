import * as React from 'react'
import { TimePicker, TimePickerProps } from '@v-uik/date-picker'

const validationErrorMessages: TimePickerProps['validationErrorMessages'] = {
  invalidTime: 'Некорректное время',
  notAllowedTime: 'Время недоступно для выбора',
}

export const TimePickerMillisecondsStory = () => {
  const [date, setDate] = React.useState<Date | null>(null)

  return (
    <div style={{ display: 'flex' }}>
      <TimePicker
        value={date}
        format="HH:mm:ss.SSS"
        mask="11:11:11.111"
        label="Label"
        labelProps={{
          id: 'label-5',
        }}
        baseTimePickerProps={{
          views: ['hours', 'minutes', 'seconds', 'milliseconds'],
        }}
        validationErrorMessages={validationErrorMessages}
        inputProps={{
          placeholder: 'hh:mm:ss.fff',
          inputProps: { 'aria-labelledby': 'label-5' },
        }}
        onChange={setDate}
      />
    </div>
  )
}
