import * as React from 'react'
import { CheckboxGroup, Checkbox, LabelControl } from '@v-uik/base'

export const LabelPosition = (): JSX.Element => {
  const [value, setValue] = React.useState<string[]>([])

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    value: string[] | undefined
  ) => {
    setValue(value ?? [])
  }

  return (
    <CheckboxGroup
      label="Main label"
      value={value}
      direction="horizontal"
      onChange={onChange}
    >
      <LabelControl
        name="start"
        control={<Checkbox />}
        label="Start"
        labelPlacement="start"
      />
      <LabelControl
        name="top"
        control={<Checkbox />}
        label="Top"
        labelPlacement="top"
      />
      <LabelControl
        name="bottom"
        control={<Checkbox />}
        label="Bottom"
        labelPlacement="bottom"
      />
      <LabelControl
        name="end"
        control={<Checkbox />}
        label="End"
        labelPlacement="end"
      />
    </CheckboxGroup>
  )
}
