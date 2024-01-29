import * as React from 'react'
import { RadioGroup, Radio } from '@v-uik/base'

const items = [
  {
    value: 'first',
    children: 'first option',
  },
  {
    value: 'second',
    disabled: true,
    children: 'second option',
  },
  {
    value: 'third',
    children: 'third option',
  },
  {
    value: 'fourth',
    children: 'fourth option',
  },
]

export default () => {
  const [value, setValue] = React.useState('first')

  return (
    <RadioGroup value={value} onChange={setValue}>
      {items.map((item, index) => (
        <Radio key={`${index}_${item.value}`} {...item} />
      ))}
    </RadioGroup>
  )
}
