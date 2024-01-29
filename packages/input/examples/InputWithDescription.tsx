import * as React from 'react'
import { Input } from '@v-uik/base'

export const InputWithDescription = (): JSX.Element => {
  return (
    <Input
      label="Login"
      description="Description"
      inputProps={{
        id: 'second-case',
        'aria-describedby': 'second-case-helper',
      }}
      labelProps={{ htmlFor: 'second-case' }}
    />
  )
}
