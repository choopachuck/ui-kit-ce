import * as React from 'react'
import { InputPassword } from '@v-uik/base'

export const LeftIconExample = (): JSX.Element => {
  const [value, setValue] = React.useState('Top Secret')

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <InputPassword
        iconPosition="start"
        buttonIconProps={{ 'aria-label': 'Show Password' }}
        value={value}
        onChange={(v: string) => setValue(v)}
      />
    </div>
  )
}
