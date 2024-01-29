import * as React from 'react'
import { Slider } from '@v-uik/base'

export const Basic = (): React.ReactElement => {
  const [value, setValue] = React.useState(1)

  return <Slider min={0} max={10} step={1} value={value} onChange={setValue} />
}

export default Basic
