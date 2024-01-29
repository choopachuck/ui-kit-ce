import * as React from 'react'
import { ComboBox, ComboboxEvent } from '@v-uik/base'
import { Placeholder } from './assets/Placeholders'

type Option = {
  value: string
  label: string
}

const options = [
  { value: 'vanilla', label: 'Vanilla' },
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'salted-caramel', label: 'Salted Caramel' },
]

export const SingleSelect = (): JSX.Element => {
  const [value, setValue] = React.useState<Option | null>()

  return (
    <div style={{ width: 288 }}>
      <ComboBox
        canClear
        openOnFocus
        helperText="Helper Text"
        label="Label"
        options={options}
        placeholder={Placeholder.SINGLE}
        value={value}
        onChange={(_v: string, _e: ComboboxEvent, fullValue?: Option) =>
          setValue(fullValue)
        }
      />
    </div>
  )
}
