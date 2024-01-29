import * as React from 'react'
import { Checkbox, LabelControl } from '@v-uik/base'

export interface WithLabelProps {
  initChecked?: boolean
}

export const WithLabel = ({
  initChecked = false,
}: WithLabelProps): JSX.Element => {
  const [checked, setChecked] = React.useState(initChecked)

  const handleChangeChecked = () => {
    setChecked(!checked)
  }

  return (
    <LabelControl
      control={<Checkbox />}
      checked={checked}
      label="Quis fugiat proident exercitation magna anim cupidatat eu irure proidentamet."
      onChange={handleChangeChecked}
    />
  )
}
