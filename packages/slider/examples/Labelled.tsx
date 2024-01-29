import * as React from 'react'
import { Slider, InputLabel } from '@v-uik/base'

export const Labelled = (): React.ReactElement => {
  const [value, setValue] = React.useState(1)

  return (
    <>
      <InputLabel id="volumeLabel">Громкость</InputLabel>
      <Slider
        min={0}
        max={10}
        step={1}
        value={value}
        markerProps={{
          'aria-labelledby': 'volumeLabel',
        }}
        onChange={setValue}
      />
    </>
  )
}
