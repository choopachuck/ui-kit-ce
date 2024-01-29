import * as React from 'react'
import { InputNumber } from '@v-uik/input-number'

const MIN = 1
const MAX = 100

export const MinAndMaxExample: React.FC = () => {
  const [value, setValue] = React.useState<number | null>(10)

  const handleChange = (val: number | null) => {
    setValue(val)
  }

  const errorText = React.useMemo(() => {
    if (value === null) {
      return ''
    }

    if (value < MIN) {
      return `Number is not valid. Min value is ${MIN}.`
    }

    if (value > MAX) {
      return `Number is not valid. Max value is ${MAX}.`
    }

    return ''
  }, [value])

  return (
    <InputNumber
      value={value}
      error={!!errorText}
      helperText={errorText}
      helperTextProps={{ error: !!errorText }}
      onChange={handleChange}
    />
  )
}
