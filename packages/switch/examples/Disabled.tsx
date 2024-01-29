import * as React from 'react'
import { LabelControl, Switch } from '@v-uik/base'

export const Disabled = (): React.ReactElement => {
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
        <div style={{ marginRight: 20 }}>
          <LabelControl
            disabled
            control={<Switch />}
            label="md disabled unchecked"
          />
        </div>
        <div style={{ marginRight: 20 }}>
          <LabelControl
            checked
            disabled
            control={<Switch />}
            label="md disabled checked"
          />
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ marginRight: 20 }}>
          <LabelControl
            disabled
            size="sm"
            control={<Switch />}
            label="sm disabled unchecked"
          />
        </div>
        <div style={{ marginRight: 20 }}>
          <LabelControl
            checked
            disabled
            size="sm"
            control={<Switch />}
            label="sm disabled checked"
          />
        </div>
      </div>
    </>
  )
}
