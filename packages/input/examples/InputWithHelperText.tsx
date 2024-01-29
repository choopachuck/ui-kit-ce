import * as React from 'react'
import { Input } from '@v-uik/base'

export const InputWithHelperText = (): JSX.Element => {
  return (
    <Input
      label="Login"
      helperText="Helper"
      inputProps={{ id: 'first-case', 'aria-describedby': 'first-case-helper' }}
      labelProps={{ htmlFor: 'first-case' }}
      helperTextProps={{ id: 'first-case-helper' }}
    />
  )
}
