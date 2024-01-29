import * as React from 'react'
import { InputPassword } from '@v-uik/base'

export const BasicInputPassword = (): JSX.Element => {
  const [value, setValue] = React.useState('Top Secret')

  return (
    <div>
      <InputPassword
        value={value}
        buttonIconProps={{ 'aria-label': 'Show Password' }}
        onChange={(v: string) => setValue(v)}
      />
      <br />
      <div>Value: {value}</div>
    </div>
  )
}
