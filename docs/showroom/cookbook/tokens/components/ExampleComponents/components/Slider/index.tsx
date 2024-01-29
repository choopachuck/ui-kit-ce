import React from 'react'
import { Slider as DefaultSlider } from '@v-uik/base'

export const Slider: React.FC = () => {
  const [value, setValue] = React.useState(1)

  return (
    <DefaultSlider
      ticks
      min={0}
      max={10}
      step={1}
      value={value}
      onChange={setValue}
    />
  )
}
