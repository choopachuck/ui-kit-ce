import * as React from 'react'
import { Input } from '@v-uik/base'

export default () => {
  const [value, setValue] = React.useState('')

  return (
    <Input
      label="Input"
      labelProps={{
        htmlFor: 'basic-input',
      }}
      inputProps={{
        id: 'basic-input',
      }}
      value={value}
      onChange={setValue}
    />
  )
}
