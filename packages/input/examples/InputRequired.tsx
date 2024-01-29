import * as React from 'react'
import { Input } from '@v-uik/base'

export const InputRequired = (): JSX.Element => {
  return (
    <Input
      required
      label="Login"
      inputProps={{ id: 'fourth-case' }}
      labelProps={{ htmlFor: 'fourth-case' }}
    />
  )
}
