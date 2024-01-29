import * as React from 'react'
import { DateTimePicker } from '@v-uik/date-picker'
import { Select } from '@v-uik/select'
import { ElementSizeType } from '@v-uik/common'
import { externalAriaProps } from '../common'

const inputProps = {
  placeholder: 'DD.MM.YYYY hh:mm',
}

export const DateTimePickerSize: React.FC = () => {
  const [date, setDate] = React.useState<Date | null>(null)

  const handleChange = React.useCallback(
    (value) => {
      setDate(value)
    },
    [setDate]
  )

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
        style={{ maxWidth: '30%', margin: '16px auto' }}
        onChange={(v: ElementSizeType) => setSize(v)}
      />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <DateTimePicker
          format="dd.MM.yy HH:mm"
          value={date}
          label="Label"
          size={size}
          calendarViewExternalProps={externalAriaProps}
          mask="11.11.11 11:11"
          inputProps={inputProps}
          onChange={handleChange}
        />
      </div>
    </div>
  )
}
