import * as React from 'react'
import { Slider } from '@v-uik/base'

export const WithTicks = (): React.ReactElement => {
  const [value, setValue] = React.useState(1)

  return (
    <Slider ticks min={0} max={10} step={1} value={value} onChange={setValue} />
  )
}
