import * as React from 'react'
import { TimePicker, TimePickerProps } from '@v-uik/date-picker'

const validationErrorMessages: TimePickerProps['validationErrorMessages'] = {
  invalidTime: 'Некорректное время',
  notAllowedTime: 'Время недоступно для выбора',
}

export const TimePickerMaskStory = () => {
  const [date, setDate] = React.useState<Date | null>(null)

  return (
    <div style={{ display: 'flex' }}>
      <TimePicker
        value={date}
        mask="11:11:11"
        format="HH:mm:ss"
        labelProps={{
          id: 'label-6',
        }}
        label="Label"
        validationErrorMessages={validationErrorMessages}
        baseTimePickerProps={{
          views: ['hours', 'minutes', 'seconds'],
          secondsStep: 15,
        }}
        inputProps={{
          placeholder: 'hh:mm:ss',
          inputProps: { 'aria-labelledby': 'label-6' },
        }}
        onChange={setDate}
      />
    </div>
  )
}
