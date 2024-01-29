import * as React from 'react'
import { InputPassword } from '@v-uik/base'

export default () => {
  const [value, setValue] = React.useState('Top secret')

  return (
    <InputPassword
      label="Password"
      labelProps={{
        htmlFor: 'basic-password-input',
      }}
      inputProps={{
        id: 'basic-password-input',
      }}
      value={value}
      onChange={setValue}
    />
  )
}
