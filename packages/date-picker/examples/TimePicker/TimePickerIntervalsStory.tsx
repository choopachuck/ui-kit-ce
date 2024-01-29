import * as React from 'react'
import { TimePicker, TimePickerProps } from '@v-uik/date-picker'

const validationErrorMessages: TimePickerProps['validationErrorMessages'] = {
  invalidTime: 'Некорректное время',
  notAllowedTime: 'Время недоступно для выбора',
}

export const TimePickerIntervalsStory: React.FC = () => {
  const [date, setDate] = React.useState<Date | null>(null)

  return (
    <div style={{ display: 'flex' }}>
      <TimePicker
        value={date}
        mask="11:11:11"
        format="HH:mm:ss"
        label="Label"
        labelProps={{
          id: 'label-7',
        }}
        validationErrorMessages={validationErrorMessages}
        baseTimePickerProps={{
          views: ['hours', 'minutes', 'seconds'],
          secondsStep: 15,
        }}
        inputProps={{
          placeholder: 'hh:mm:ss',
          inputProps: { 'aria-labelledby': 'label-7' },
        }}
        onChange={setDate}
      />
    </div>
  )
}
