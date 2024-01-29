import * as React from 'react'
import { Input } from '@v-uik/base'

export const InputWithClear = (): JSX.Element => {
  const [value, setValue] = React.useState<string>('some value')

  return <Input canClear value={value} onChange={setValue} />
}
