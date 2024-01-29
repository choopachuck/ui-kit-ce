import * as React from 'react'
import { ButtonGroup, Button } from '@v-uik/base'

export const Single = (): React.ReactElement => {
  const [value, setValue] = React.useState<string | string[]>()

  const onChange = (
    event: React.MouseEvent<HTMLButtonElement>,
    value: string | string[]
  ) => {
    setValue(value)
  }

  return (
    <ButtonGroup value={value} onChange={onChange}>
      <Button name="debt">Button 1</Button>
      <Button name="credit">Button 2</Button>
      <Button name="cash">Button 3</Button>
    </ButtonGroup>
  )
}
