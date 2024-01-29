import React from 'react'
import { MaskedInput } from '@v-uik/base'

export const Example = (): JSX.Element => {
  const [value, setValue] = React.useState('')

  return (
    <MaskedInput
      label="Masked Input"
      labelProps={{
        htmlFor: 'basic-masked-input',
      }}
      inputProps={{
        id: 'basic-masked-input',
      }}
      value={value}
      mask="+7 (111) 111-11-11"
      onChange={setValue}
    />
  )
}

export default Example
