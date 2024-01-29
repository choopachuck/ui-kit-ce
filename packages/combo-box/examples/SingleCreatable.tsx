import * as React from 'react'
import { Creatable } from '@v-uik/base'
import { Placeholder } from './assets/Placeholders'

interface IOption {
  value: string
  label: string
}

const options: IOption[] = [
  { value: 'vanilla', label: 'Vanilla' },
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'salted-caramel', label: 'Salted Caramel' },
]

export const SingleCreatable = (): JSX.Element => {
  const [value, setValue] = React.useState<IOption | null>(null)

  return (
    <div style={{ width: 288 }}>
      <Creatable
        canClear
        clearInputOnBlur
        openOnFocus
        formatLabel={(v) => `Add "${v}"`}
        helperText="Helper Text"
        label="Label"
        options={options}
        placeholder={Placeholder.SINGLE_SEARCHABLE}
        noOptionsText="No options"
        value={value}
        onChange={setValue}
      />
    </div>
  )
}
