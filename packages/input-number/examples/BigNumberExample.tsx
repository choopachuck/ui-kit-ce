import * as React from 'react'
import { InputNumber } from '@v-uik/base'

export const BigNumberExample = (): React.ReactElement => {
  const [value, setValue] = React.useState<string | undefined>(
    String(Number.MAX_SAFE_INTEGER)
  )

  const handleChange = (val: string | null) => {
    setValue(val === null ? undefined : val)
  }

  return (
    <div>
      <InputNumber
        precision={3}
        valueType="string"
        groupSeparator=","
        decimalSeparator="."
        value={value}
        onChange={handleChange}
      />
    </div>
  )
}
