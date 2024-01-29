import * as React from 'react'
import { LabelControl, Checkbox } from '@v-uik/base'

export default () => {
  return (
    <LabelControl
      label="Checkbox label"
      id="test-id"
      inputProps={{
        'aria-labelledby': 'test-id',
      }}
      control={<Checkbox />}
    />
  )
}
