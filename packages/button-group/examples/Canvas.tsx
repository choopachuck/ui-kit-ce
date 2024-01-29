import * as React from 'react'
import { Button, ButtonGroup } from '@v-uik/base'

const items = [
  {
    name: 'first',
    children: 'button 1',
  },
  {
    name: 'second',
    disabled: true,
    children: 'button 2',
  },
  {
    name: 'third',
    children: 'long button 3',
  },
  {
    name: 'fourth',
    children: 'button 4',
  },
]

export default () => {
  const [value, setValue] = React.useState<string | string[]>('first')

  return (
    <ButtonGroup value={value} onChange={(_, value) => setValue(value)}>
      {items.map((item, index) => (
        <Button key={`${index}_${item.name}`} {...item} />
      ))}
    </ButtonGroup>
  )
}
