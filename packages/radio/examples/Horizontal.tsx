import * as React from 'react'
import { RadioGroup, Radio, LabelControl } from '@v-uik/base'

export const Horizontal = (): React.ReactElement => {
  const [value, setValue] = React.useState('debt')

  return (
    <RadioGroup
      label="Label"
      value={value}
      direction="horizontal"
      name="Horizontal"
      onChange={setValue}
    >
      <LabelControl value="debt" control={<Radio />} label="Radio label 1" />
      <LabelControl value="credit" control={<Radio />} label="Radio label 2" />
      <LabelControl value="cash" control={<Radio />} label="Radio label 3" />
    </RadioGroup>
  )
}
