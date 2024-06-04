import React from 'react'
import { TimePicker, TimePickerProps } from '@v-uik/date-picker'
import { Select } from '@v-uik/select'
import { ElementSizeType } from '@v-uik/common'

const validationErrorMessages: TimePickerProps['validationErrorMessages'] = {
  invalidTime: 'Некорректное время',
  notAllowedTime: 'Время недоступно для выбора',
  isAfterEndTime: 'Время начала позже времени конца',
  isBeforeStartTime: 'Время конца раньше времени начала',
}

export const TimeRangePickerSizeStory: React.FC = () => {
  const [date, setDate] = React.useState<
    [Date | null | number, Date | null | number]
  >([null, null])
  const [size, setSize] = React.useState<ElementSizeType>('md')

  return (
    <div>
      <Select
        value={size}
        label="Размеры"
        options={[
          { value: 'sm', label: 'sm' },
          { value: 'md', label: 'md' },
          { value: 'lg', label: 'lg' },
        ]}
        style={{ margin: '16px auto', maxWidth: '30%' }}
        onChange={(value: ElementSizeType) => setSize(value)}
      />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <TimePicker.RangePicker
          label="Label"
          value={date}
          size={size}
          validationErrorMessages={validationErrorMessages}
          mask="11:11:11"
          format="HH:mm:ss"
          startInputProps={{ placeholder: 'hh:mm:ss' }}
          endInputProps={{ placeholder: 'hh:mm:ss' }}
          startTimePickerProps={{ views: ['hours', 'minutes', 'seconds'] }}
          endTimePickerProps={{ views: ['hours', 'minutes', 'seconds'] }}
          onChange={setDate}
        />
      </div>
    </div>
  )
}
