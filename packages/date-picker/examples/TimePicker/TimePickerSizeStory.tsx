import * as React from 'react'
import { TimePicker, TimePickerProps } from '@v-uik/date-picker'
import { ComboBox } from '@v-uik/combo-box'
import { ElementSizeType } from '@v-uik/common'

const validationErrorMessages: TimePickerProps['validationErrorMessages'] = {
  invalidTime: 'Некорректное время',
  notAllowedTime: 'Время недоступно для выбора',
}

export const TimePickerSizeStory: React.FC = () => {
  const [date, setDate] = React.useState<Date | null>(null)
  const [size, setSize] = React.useState<ElementSizeType>('md')

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <div style={{ width: '30%' }}>
        <ComboBox
          value={size}
          options={[
            { value: 'sm', label: 'sm' },
            { value: 'md', label: 'md' },
            { value: 'lg', label: 'lg' },
          ]}
          onChange={(value: string) => setSize(value as ElementSizeType)}
        />
      </div>
      <div style={{ display: 'flex', marginTop: 24 }}>
        <TimePicker
          value={date}
          size={size}
          validationErrorMessages={validationErrorMessages}
          labelProps={{
            id: 'label-4',
          }}
          label="label"
          mask="11:11.11"
          format="hh:mm:ss"
          baseTimePickerProps={{
            views: ['minutes', 'seconds', 'milliseconds'],
          }}
          inputProps={{
            placeholder: 'mm:ss.fff',
            inputProps: { 'aria-labelledby': 'label-4' },
          }}
          onChange={setDate}
        />
      </div>
    </div>
  )
}
