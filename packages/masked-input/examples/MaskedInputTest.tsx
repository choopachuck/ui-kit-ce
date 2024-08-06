import React from 'react'
import {
  MaskedInput,
  MaskedInputProps,
  InputChangeReason,
  MaskedInputChangeEvent,
} from '@v-uik/base'

export const MaskedInputTest: React.FC<MaskedInputProps> = ({
  onChange,
  value: valueProp,
  ...rest
}) => {
  const [value, setValue] = React.useState(valueProp)

  const handleChange = (
    value: string,
    event?: MaskedInputChangeEvent,
    reason?: InputChangeReason
  ) => {
    onChange?.(value, event, reason)
    setValue(value)
  }

  return <MaskedInput {...rest} value={value} onChange={handleChange} />
}
