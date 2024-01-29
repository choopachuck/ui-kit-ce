import * as React from 'react'
import {
  CheckboxGroup,
  Checkbox as DefaultCheckbox,
  LabelControl,
} from '@v-uik/base'

export const Checkbox = (): JSX.Element => {
  const [value, setValue] = React.useState<string[]>([])

  const onChange = (
    _event: React.ChangeEvent<HTMLInputElement>,
    value: string[] | undefined
  ) => {
    setValue(value ?? [])
  }

  return (
    <CheckboxGroup label="Расположение" value={value} onChange={onChange}>
      <LabelControl
        name="debt"
        control={<DefaultCheckbox />}
        label="Дебетовая карта"
      />
      <LabelControl
        name="credit"
        control={<DefaultCheckbox />}
        label="Кредитная карта"
      />
      <LabelControl
        name="cash"
        control={<DefaultCheckbox />}
        label="Наличные"
      />
    </CheckboxGroup>
  )
}
