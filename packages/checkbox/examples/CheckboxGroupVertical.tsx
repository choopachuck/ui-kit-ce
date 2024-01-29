import * as React from 'react'
import { CheckboxGroup, Checkbox, LabelControl } from '@v-uik/base'

export const CheckboxGroupVertical = (): JSX.Element => {
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
      direction="vertical"
      onChange={onChange}
    >
      <LabelControl
        name="debt"
        control={<Checkbox />}
        label="Checkbox label 1"
      />
      <LabelControl
        name="credit"
        control={<Checkbox />}
        label="Checkbox label 2"
      />
      <LabelControl
        name="cash"
        control={<Checkbox />}
        label="Checkbox label 3"
      />
    </CheckboxGroup>
  )
}
