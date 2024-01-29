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

export const Sizes = (): JSX.Element => {
  const [value, setValue] = React.useState<Option>()

  return (
    <div style={{ width: '100%', display: 'flex', gap: 20 }}>
      <ComboBox
        canClear
        openOnFocus
        helperText="Helper Text"
        label="Label"
        options={options}
        placeholder={Placeholder.SINGLE}
        value={value}
        size="sm"
        onChange={(_v: string, _e: ComboboxEvent, fullValue?: Option) =>
          setValue(fullValue)
        }
      />
      <ComboBox
        canClear
        openOnFocus
        helperText="Helper Text"
        label="Label"
        options={options}
        placeholder={Placeholder.SINGLE}
        value={value}
        size="md"
        onChange={(_v: string, _e: ComboboxEvent, fullValue?: Option) =>
          setValue(fullValue)
        }
      />
      <ComboBox
        canClear
        openOnFocus
        helperText="Helper Text"
        label="Label"
        options={options}
        placeholder={Placeholder.SINGLE}
        value={value}
        size="lg"
        onChange={(_v: string, _e: ComboboxEvent, fullValue?: Option) =>
          setValue(fullValue)
        }
      />
    </div>
  )
}
