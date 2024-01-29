import * as React from 'react'
import { Switch } from '@v-uik/base'

export const DifferentSizeSwitches = (): React.ReactElement => {
  const [value, setValue] = React.useState(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.checked)
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Switch checked={value} size="sm" onChange={handleChange} />

      <Switch
        style={{ marginLeft: 20 }}
        checked={value}
        onChange={handleChange}
      />
    </div>
  )
}
