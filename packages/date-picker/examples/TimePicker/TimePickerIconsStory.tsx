import * as React from 'react'
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
}

export const TimePickerIconsStory: React.FC = () => {
  const [date, setDate] = React.useState<null | Date>(null)

  return (
    <div>
      <div>
        <Text style={{ marginBottom: 16 }}>Default</Text>

        <TimePicker
          value={date}
          label="Label"
          validationErrorMessages={validationErrorMessages}
          labelProps={{
            id: 'label-8',
          }}
          mask="11:11:11"
          inputProps={{
            placeholder: 'hh:mm:ss',
            inputProps: { 'aria-labelledby': 'label-8' },
          }}
          baseTimePickerProps={{ views: ['hours', 'minutes', 'seconds'] }}
          format="HH:mm:ss"
          onChange={(d) => setDate(d)}
        />
      </div>
      <div style={{ marginTop: 24 }}>
        <Text style={{ marginBottom: 16 }}>--</Text>
        <TimePicker
          value={date}
          label="label"
          labelProps={{
            id: 'label-9',
          }}
          mask="11:11:11"
          format="HH:mm:ss"
          baseTimePickerProps={{ views: ['hours', 'minutes', 'seconds'] }}
          inputProps={{
            suffix: null,
            placeholder: 'hh:mm:ss',
            inputProps: { 'aria-labelledby': 'label-9' },
          }}
          onChange={(d) => setDate(d)}
        />
      </div>
      <div style={{ marginTop: 24 }}>
        <Text style={{ marginBottom: 16 }}>Иконка (любая)</Text>
        <TimePicker
          value={date}
          label="label"
          mask="11:11:11"
          labelProps={{
            id: 'label-10',
          }}
          baseTimePickerProps={{
            views: ['hours', 'minutes', 'seconds'],
          }}
          format="HH:mm:ss"
          inputProps={{
            suffix: <SomeIcon />,
            prefix: <SomeIcon />,
            placeholder: 'hh:mm:ss',
            inputProps: { 'aria-labelledby': 'label-10' },
          }}
          onChange={(d) => setDate(d)}
        />
      </div>
    </div>
  )
}
