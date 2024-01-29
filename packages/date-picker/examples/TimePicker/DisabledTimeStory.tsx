import * as React from 'react'
import {
  DisableTimeViewType,
  TimePicker,
  TimePickerProps,
} from '@v-uik/date-picker'

const validationErrorMessages: TimePickerProps['validationErrorMessages'] = {
  invalidTime: 'Некорректное время',
  notAllowedTime: 'Время недоступно для выбора',
}

export const DisabledTimeStory = (): JSX.Element => {
  const [date, setDate] = React.useState<Date | null>(null)

  return (
    <div style={{ display: 'flex' }}>
      <TimePicker
        value={date}
        mask="11:11:11"
        format="HH:mm:ss"
        label="Label"
        validationErrorMessages={validationErrorMessages}
        labelProps={{
          id: 'label-14',
        }}
        baseTimePickerProps={{
          views: ['hours', 'minutes', 'seconds'],
          shouldDisableTime: (_date: Date, view: DisableTimeViewType) => {
            if (view === 'minutes') {
              return date ? date.getHours() === _date.getMinutes() : false
            }

            if (view === 'seconds') {
              return [5, 6, 7].includes(_date?.getSeconds())
            }

            return false
          },
        }}
        inputProps={{
          placeholder: 'hh:mm:ss',
          inputProps: { 'aria-labelledby': 'label-14' },
        }}
        onChange={setDate}
      />
    </div>
  )
}
