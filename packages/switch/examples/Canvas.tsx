import * as React from 'react'
import { Switch } from '@v-uik/base'

export default () => {
  const [checked, setChecked] = React.useState(false)

  return (
    <Switch checked={checked} onChange={(e) => setChecked(e.target.checked)} />
  )
}
