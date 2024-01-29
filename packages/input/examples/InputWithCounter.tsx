import * as React from 'react'
import { Input } from '@v-uik/base'

export const InputWithCounter = (): JSX.Element => {
  const [value, setValue] = React.useState<string>('')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
      <div style={{ maxWidth: 290 }}>
        <Input
          showCount
          fullWidth
          inputProps={{ maxLength: 100 }}
          value={value}
          onChange={setValue}
        />
      </div>
      <div style={{ maxWidth: 290 }}>
        <Input showCount fullWidth value={value} onChange={setValue} />
      </div>
    </div>
  )
}
