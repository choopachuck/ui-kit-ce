import * as React from 'react'
import { Slider } from '@v-uik/base'

export const Disabled = (): React.ReactElement => {
  const [value, setValue] = React.useState(1)

  return (
    <Slider
      disabled
      min={0}
      max={10}
      step={1}
      value={value}
      onChange={setValue}
    />
  )
}
