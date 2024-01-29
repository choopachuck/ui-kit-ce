import * as React from 'react'
import { DatePicker, LabelControl, Switch } from '@v-uik/base'
import { externalAriaProps } from './common'

const inputProps = {
  placeholder: 'дд.мм.гггг',
}

export const TriggerOnChangeOnInvalid = (): React.ReactElement => {
  const [date, setDate] = React.useState<Date | null>(null)
  const [triggerOnChangeOnInvalid, setTriggerOnChangeOnInvalid] =
    React.useState<boolean>(true)

  const handleChange = React.useCallback(
    (value) => {
      setDate(value)
    },
    [setDate]
  )

  const onSwitchChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setDate(null)
    setTriggerOnChangeOnInvalid(ev.target.checked)
  }

  return (
    <>
      <LabelControl
        checked={triggerOnChangeOnInvalid}
        control={<Switch />}
        label="Вызывать onChange на недействительные даты"
        onChange={onSwitchChange}
      />
      <div>
        Значение переменной value:{' '}
        {isNaN(Number(date)) ? 'Недействительная дата' : JSON.stringify(date)}
      </div>
      <DatePicker
        triggerOnChangeOnInvalid={triggerOnChangeOnInvalid}
        value={date}
        mask="11.11.1111"
        inputProps={inputProps}
        calendarViewExternalProps={externalAriaProps}
        onChange={handleChange}
      />
    </>
  )
}
