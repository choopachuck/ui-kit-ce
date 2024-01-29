import * as React from 'react'
import { TimePicker, TimePickerProps } from '@v-uik/date-picker'
import { Text } from '@v-uik/typography'

const validationErrorMessages: TimePickerProps['validationErrorMessages'] = {
  invalidTime: 'Некорректное время',
  notAllowedTime: 'Время недоступно для выбора',
}

const TimePickerFull = () => {
  const [date, setDate] = React.useState<Date | null>(null)

  return (
    <TimePicker
      value={date}
      format="HH:mm:ss.SSS"
      mask="11:11:11.111"
      label="Label"
      labelProps={{
        id: 'label',
      }}
      baseTimePickerProps={{
        views: ['hours', 'minutes', 'seconds', 'milliseconds'],
      }}
      validationErrorMessages={validationErrorMessages}
      inputProps={{
        placeholder: 'hh:mm:ss.fff',
        inputProps: { 'aria-labelledby': 'label' },
      }}
      onChange={setDate}
    />
  )
}

const TimePickerHoursMinutes = () => {
  const [date, setDate] = React.useState<Date | null>(null)

  return (
    <TimePicker
      value={date}
      format="HH:mm"
      mask="11:11"
      label="Label"
      labelProps={{
        id: 'label-1',
      }}
      baseTimePickerProps={{
        views: ['hours', 'minutes'],
      }}
      inputProps={{
        placeholder: 'hh:mm',
        inputProps: { 'aria-labelledby': 'label-1' },
      }}
      onChange={setDate}
    />
  )
}

const TimePickerMinutesSeconds = () => {
  const [date, setDate] = React.useState<Date | null>(null)

  return (
    <TimePicker
      value={date}
      format="mm:ss"
      mask="11:11"
      label="Label"
      labelProps={{
        id: 'label-1',
      }}
      baseTimePickerProps={{
        views: ['hours', 'minutes'],
      }}
      inputProps={{
        placeholder: 'mm:ss',
        inputProps: { 'aria-labelledby': 'label-1' },
      }}
      onChange={setDate}
    />
  )
}

export const TimePickerTimeCombinationStory = () => {
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Text style={{ marginBottom: 10 }}>
          Часы, минуты, секунды, миллисекунды
        </Text>
        <TimePickerFull />
      </div>
      <div style={{ marginBottom: 24 }}>
        <Text style={{ marginBottom: 10 }}>Часы и минуты</Text>
        <TimePickerHoursMinutes />
      </div>
      <div style={{ marginBottom: 24 }}>
        <Text style={{ marginBottom: 10 }}>Минуты и секунды</Text>
        <TimePickerMinutesSeconds />
      </div>
    </div>
  )
}
