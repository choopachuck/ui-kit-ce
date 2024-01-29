import * as React from 'react'
import { RadioGroup, Radio, LabelControl } from '@v-uik/base'

export const Vertical = (): React.ReactElement => {
  const [value, setValue] = React.useState('')

  return (
    <RadioGroup
      label="Label"
      value={value}
      direction="vertical"
      name="Vertical"
      onChange={setValue}
    >
      <LabelControl value="debt" control={<Radio />} label="Radio label 1" />
      <LabelControl value="credit" control={<Radio />} label="Radio label 2" />
      <LabelControl value="cash" control={<Radio />} label="Radio label 3" />
    </RadioGroup>
  )
}
