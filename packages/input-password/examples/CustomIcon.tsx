import * as React from 'react'
import { InputPassword } from '@v-uik/base'

export const CustomIcon = (): JSX.Element => {
  const [value, setValue] = React.useState('Top Secret')

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <InputPassword
        buttonIconProps={{ 'aria-label': 'Show Password' }}
        showIcon="❤️"
        hideIcon="💔"
        value={value}
        onChange={(v: string) => setValue(v)}
      />
    </div>
  )
}
