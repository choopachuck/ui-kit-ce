import * as React from 'react'
import { TimePicker, TimePickerProps } from '@v-uik/date-picker'

const validationErrorMessages: TimePickerProps['validationErrorMessages'] = {
  invalidTime: 'Некорректное время',
  notAllowedTime: 'Время недоступно для выбора',
  isAfterEndTime: 'Время начала позже времени конца',
  isBeforeStartTime: 'Время конца раньше времени начала',
}

export const TimeRangePickerStory = (): React.ReactElement => {
  const [date, setDate] = React.useState<
    [Date | null | number, Date | null | number]
  >([null, null])

  return (
    <div style={{ display: 'flex' }}>
      <TimePicker.RangePicker
        value={date}
        label="Label"
        mask="11:11:11"
        validationErrorMessages={validationErrorMessages}
        format="HH:mm:ss"
        startInputProps={{ placeholder: 'hh:mm:ss' }}
        endInputProps={{ placeholder: 'hh:mm:ss' }}
        startTimePickerProps={{ views: ['hours', 'minutes', 'seconds'] }}
        endTimePickerProps={{ views: ['hours', 'minutes', 'seconds'] }}
        onChange={setDate}
      />
    </div>
  )
}
