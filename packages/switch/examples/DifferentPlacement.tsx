import * as React from 'react'
import { LabelControl, Switch } from '@v-uik/base'

export const DifferentPlacement = (): React.ReactElement => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ marginRight: 20 }}>
        <LabelControl
          labelPlacement="start"
          control={<Switch />}
          label="start"
        />
      </div>

      <div style={{ marginRight: 20 }}>
        <LabelControl labelPlacement="top" control={<Switch />} label="top" />
      </div>

      <div style={{ marginRight: 20 }}>
        <LabelControl
          labelPlacement="bottom"
          control={<Switch />}
          label="bottom"
        />
      </div>

      <div style={{ marginRight: 20 }}>
        <LabelControl labelPlacement="end" control={<Switch />} label="end" />
      </div>
    </div>
  )
}
