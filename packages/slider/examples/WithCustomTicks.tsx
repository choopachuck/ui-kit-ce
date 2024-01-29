import * as React from 'react'
import { Slider, TickItem } from '@v-uik/base'

const ticks: TickItem[] = [
  {
    value: 3,
    label: '3',
  },
  {
    value: 7,
    label: '7',
  },
]

export const WithCustomTicks = (): React.ReactElement => {
  const [value, setValue] = React.useState(0)

  return (
    <Slider
      ticks={ticks}
      min={0}
      max={10}
      step={1}
      value={value}
      onChange={setValue}
    />
  )
}
