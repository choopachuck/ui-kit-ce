import * as React from 'react'
import { RangePicker } from '@v-uik/base'

export default () => {
  const [date, setDate] = React.useState<
    [Date | null | number, Date | null | number]
  >([null, null])

  return (
    <RangePicker
      label="Range Picker"
      mask="11.11.1111"
      value={date}
      startInputProps={{
        inputProps: { id: 'date-time-picker' },
        placeholder: 'From',
      }}
      endInputProps={{
        placeholder: 'To',
      }}
      labelProps={{ htmlFor: 'date-time-picker' }}
      onChange={setDate}
    />
  )
}
