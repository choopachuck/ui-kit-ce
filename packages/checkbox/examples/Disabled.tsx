import * as React from 'react'
import { Checkbox, LabelControl } from '@v-uik/base'

export const Disabled = (): JSX.Element => {
  return (
    <>
      <LabelControl
        checked
        disabled
        label="Selected/Disabled"
        control={<Checkbox />}
      />
      <LabelControl
        disabled
        label="Deselected/Disabled"
        control={<Checkbox />}
      />
      <LabelControl
        disabled
        label="Indeterminate/Disabled"
        control={<Checkbox indeterminate />}
      />
    </>
  )
}
