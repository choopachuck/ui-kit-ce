import * as React from 'react'
import { DatePicker } from '@v-uik/base'

export default () => {
  const [value, setValue] = React.useState(null)

  return (
    <DatePicker
      value={value}
      label="DatePicker"
      inputProps={{ inputProps: { id: 'basic-date-picker' } }}
      labelProps={{ htmlFor: 'basic-date-picker' }}
      onChange={setValue}
    />
  )
}
