import React from 'react'
import { TimePicker, TimePickerProps } from '@v-uik/date-picker'
import { Text } from '@v-uik/typography'

const SomeIcon: React.FC = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.5 1.5C2.84315 1.5 1.5 2.84315 1.5 4.5V10.5H3V4.5C3 3.67157 3.67157 3 4.5 3H10.5V1.5H4.5ZM3 13.5H1.5V19.5C1.5 21.1569 2.84315 22.5 4.5 22.5H10.5V21H4.5C3.67157 21 3 20.3284 3 19.5V13.5ZM19.5 22.5H13.5V21H19.5C20.3284 21 21 20.3284 21 19.5V13.5H22.5V19.5C22.5 21.1569 21.1569 22.5 19.5 22.5ZM22.5 10.5V4.5C22.5 2.84315 21.1569 1.5 19.5 1.5H13.5V3H19.5C20.3284 3 21 3.67157 21 4.5V10.5H22.5Z"
      fill="black"
      fillOpacity="0.57"
    />
  </svg>
)

const validationErrorMessages: TimePickerProps['validationErrorMessages'] = {
  invalidTime: 'Некорректное время',
  notAllowedTime: 'Время недоступно для выбора',
  isAfterEndTime: 'Время начала позже времени конца',
  isBeforeStartTime: 'Время конца раньше времени начала',
}

export const TimeRangePickerIcons = () => {
  const [date, setDate] = React.useState<[Date | null, Date | null]>([
    null,
    null,
  ])

  const handleChange = React.useCallback(
    (value) => {
      setDate(value)
    },
    [setDate]
  )

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Text style={{ marginBottom: 16 }}>Default</Text>
        <TimePicker.RangePicker
          value={date}
          label="Label"
          mask="11:11:11"
          format="HH:mm:ss"
          startInputProps={{ placeholder: 'hh:mm:ss' }}
          endInputProps={{ placeholder: 'hh:mm:ss' }}
          startTimePickerProps={{ views: ['hours', 'minutes', 'seconds'] }}
          endTimePickerProps={{ views: ['hours', 'minutes', 'seconds'] }}
          validationErrorMessages={validationErrorMessages}
          onChange={handleChange}
        />
      </div>
      <div style={{ marginBottom: 24 }}>
        <Text style={{ marginBottom: 16 }}>--</Text>
        <TimePicker.RangePicker
          value={date}
          label="Label"
          mask="11:11:11"
          format="HH:mm:ss"
          suffix={null}
          startInputProps={{ placeholder: 'hh:mm:ss' }}
          endInputProps={{ placeholder: 'hh:mm:ss' }}
          validationErrorMessages={validationErrorMessages}
          startTimePickerProps={{ views: ['hours', 'minutes', 'seconds'] }}
          endTimePickerProps={{ views: ['hours', 'minutes', 'seconds'] }}
          onChange={handleChange}
        />
      </div>
      <div style={{ marginBottom: 24 }}>
        <Text style={{ marginBottom: 16 }}>Иконка (любая)</Text>
        <TimePicker.RangePicker
          value={date}
          label="Label"
          mask="11:11:11"
          format="HH:mm:ss"
          suffix={<SomeIcon />}
          startInputProps={{ placeholder: 'hh:mm:ss' }}
          endInputProps={{ placeholder: 'hh:mm:ss' }}
          validationErrorMessages={validationErrorMessages}
          startTimePickerProps={{ views: ['hours', 'minutes', 'seconds'] }}
          endTimePickerProps={{ views: ['hours', 'minutes', 'seconds'] }}
          onChange={handleChange}
        />
      </div>
    </div>
  )
}
