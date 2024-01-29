import React from 'react'
import { TimePicker, TimePickerProps } from '@v-uik/date-picker'
import { createUseStyles } from '@v-uik/theme'

const useBaseTimepickerStyles = createUseStyles({
  root: {
    maxHeight: 578,
  },
  option: {
    padding: [24, 16],
  },
})

const validationErrorMessages: TimePickerProps['validationErrorMessages'] = {
  invalidTime: 'Некорректное время',
  notAllowedTime: 'Время недоступно для выбора',
}

export const TimePickerCustomClasses: React.FC = () => {
  const [date, setDate] = React.useState<Date | null>(null)

  const baseTimePickerClasses = useBaseTimepickerStyles()

  return (
    <div style={{ display: 'flex' }}>
      <TimePicker
        value={date}
        mask="11:11:11"
        label="Label"
        validationErrorMessages={validationErrorMessages}
        format="HH:mm:ss"
        labelProps={{
          id: 'label-12',
        }}
        baseTimePickerProps={{
          views: ['hours', 'minutes', 'seconds'],
          classes: baseTimePickerClasses,
        }}
        inputProps={{
          placeholder: 'hh:mm:ss',
          inputProps: { 'aria-labelledby': 'label-12' },
        }}
        onChange={setDate}
      />
    </div>
  )
}
