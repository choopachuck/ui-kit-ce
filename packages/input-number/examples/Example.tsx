import * as React from 'react'
import { InputNumber } from '@v-uik/base'

export const Example = (): React.ReactElement => {
  const [value, setValue] = React.useState<number | undefined>(1234.567)

  const handleChange = (val: number | null) => {
    setValue(val === null ? undefined : val)
  }

  return (
    <div>
      <InputNumber
        precision={3}
        groupSeparator=","
        decimalSeparator="."
        value={value}
        onChange={handleChange}
      />
    </div>
  )
}
