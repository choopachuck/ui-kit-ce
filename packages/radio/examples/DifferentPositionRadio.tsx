import * as React from 'react'
import { RadioGroup, Radio, LabelControl } from '@v-uik/base'

export const DifferentPositionRadio = (): React.ReactElement => {
  const [value, setValue] = React.useState('')

  return (
    <RadioGroup
      label="Label"
      value={value}
      direction="horizontal"
      name="DifferentPositionRadio"
      onChange={setValue}
    >
      <LabelControl
        labelPlacement="start"
        value="start"
        control={<Radio />}
        label="Start"
      />
      <LabelControl
        labelPlacement="top"
        value="top"
        control={<Radio />}
        label="Top"
      />
      <LabelControl
        labelPlacement="bottom"
        value="bottom"
        control={<Radio />}
        label="Bottom"
      />
      <LabelControl
        labelPlacement="end"
        value="end"
        control={<Radio />}
        label="End"
      />
    </RadioGroup>
  )
}
