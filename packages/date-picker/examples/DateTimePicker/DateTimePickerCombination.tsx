import * as React from 'react'
import { DatePicker, TimePicker } from '@v-uik/date-picker'
import { createUseStyles } from '@v-uik/theme'
import { externalAriaProps } from '../common'

const useStyles = createUseStyles({
  datePicker: {
    display: 'block',
    marginRight: 12,
  },
  datePickerInput: {
    width: 168,
    boxSizing: 'border-box',
  },
  timePicker: {
    width: 140,
    boxSizing: 'border-box',
  },
})

export const DateTimePickerCombination: React.FC = () => {
  const [date, setDate] = React.useState<Date | null>(null)
  const classList = useStyles()

  return (
    <div style={{ display: 'flex' }}>
      <DatePicker
        value={date}
        className={classList.datePicker}
        calendarViewExternalProps={externalAriaProps}
        inputProps={{
          className: classList.datePickerInput,
          placeholder: 'DD.MM.YYYY',
        }}
        label="Label"
        mask="11.11.1111"
        onChange={setDate}
      />
      <TimePicker
        value={date}
        label="Label"
        mask="11:11:11"
        format="HH:mm:ss"
        labelProps={{
          id: 'label',
        }}
        baseTimePickerProps={{
          views: ['hours', 'minutes', 'seconds'],
        }}
        inputProps={{
          placeholder: 'hh:mm:ss',
          className: classList.timePicker,
          inputProps: { 'aria-labelledby': 'label' },
        }}
        onChange={setDate}
      />
    </div>
  )
}
