import * as React from 'react'
import { TimePicker, TimePickerProps } from '@v-uik/date-picker'

const validationErrorMessages: TimePickerProps['validationErrorMessages'] = {
  invalidTime: 'Некорректное время',
  notAllowedTime: 'Время недоступно для выбора',
}

export const TimePickerStory = (): JSX.Element => {
  const [date, setDate] = React.useState<Date | null>(null)

  return (
    <div style={{ display: 'flex' }}>
      <TimePicker
        label="Label"
        labelProps={{
          id: 'label',
        }}
        value={date}
        mask="11:11:11"
        validationErrorMessages={validationErrorMessages}
        format="HH:mm:ss"
        baseTimePickerProps={{
          views: ['hours', 'minutes', 'seconds'],
        }}
        inputProps={{
          placeholder: 'hh:mm:ss',
          inputProps: { 'aria-labelledby': 'label' },
        }}
        onChange={setDate}
      />
    </div>
  )
}
