import * as React from 'react'
import { Checkbox } from '@v-uik/base'

export default () => {
  const [checked, setChecked] = React.useState(false)

  return <Checkbox checked={checked} onChange={() => setChecked(!checked)} />
}
