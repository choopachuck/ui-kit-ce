import * as React from 'react'
import { RadioGroup, LabelControl, Radio } from '@v-uik/base'

export const DisabledRadio = (): React.ReactElement => {
  const [value, setValue] = React.useState('block1')

  return (
    <RadioGroup
      label="Label"
      value={value}
      direction="horizontal"
      name="DisabledRadio"
      onChange={setValue}
    >
      <LabelControl
        disabled
        label="Disabled 1"
        value="block1"
        control={<Radio />}
      />
      <LabelControl
        disabled
        label="Disabled 2"
        value="block2"
        control={<Radio />}
      />
      <LabelControl
        label="Enabled"
        disabled={false}
        value="enabled"
        control={<Radio />}
      />
    </RadioGroup>
  )
}
