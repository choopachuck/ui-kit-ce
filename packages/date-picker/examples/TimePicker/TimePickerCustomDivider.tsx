import React from 'react'
import { TimePicker, TimePickerProps } from '@v-uik/date-picker'

const validationErrorMessages: TimePickerProps['validationErrorMessages'] = {
  invalidTime: 'Некорректное время',
  notAllowedTime: 'Время недоступно для выбора',
}

export const TimePickerCustomDivider: React.FC = () => {
  const [date, setDate] = React.useState<Date | null>(null)

  return (
    <div style={{ display: 'flex' }}>
      <TimePicker
        value={date}
        mask="11-11-11"
        format="HH-mm-ss"
        labelProps={{
          id: 'label-11',
        }}
        baseTimePickerProps={{
          views: ['hours', 'minutes', 'seconds'],
        }}
        validationErrorMessages={validationErrorMessages}
        inputProps={{
          placeholder: 'hh-mm-ss',
          inputProps: { 'aria-labelledby': 'label-11' },
        }}
        onChange={setDate}
      />
    </div>
  )
}
