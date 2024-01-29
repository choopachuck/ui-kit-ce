import * as React from 'react'
import { InputNumber } from '@v-uik/base'

export default () => {
  const [value, setValue] = React.useState<number | null>(12345.67)

  return (
    <InputNumber
      label="InputNumber"
      labelProps={{
        htmlFor: 'basic-input-number',
      }}
      inputProps={{
        id: 'basic-input-number',
      }}
      value={value}
      onChange={setValue}
    />
  )
}
