import * as React from 'react'
import { ComboBox, ComboboxEvent } from '@v-uik/base'
import { Placeholder } from './assets/Placeholders'

type Option = {
  value: string
  label: string
  rating: number
}

const options = [
  { value: 'vanilla', label: 'Vanilla', rating: 2 },
  { value: 'chocolate', label: 'Chocolate', rating: 4 },
  { value: 'strawberry', label: 'Strawberry', rating: 1 },
  { value: 'salted-caramel', label: 'Salted Caramel', rating: 6 },
  { value: 'double-chocolate', label: 'Double Chocolate', rating: 5 },
  { value: 'late', label: 'Late', rating: 12 },
  { value: 'raf', label: 'Raf', rating: 7 },
]

export const TermDisabled = (): JSX.Element => {
  const [value, setValue] = React.useState<Option>()

  return (
    <div style={{ width: 350 }}>
      <ComboBox
        canClear
        isSearchable
        clearInputOnBlur
        openOnFocus
        helperText="Helper Text"
        label="Label"
        options={options}
        getOptionLabel={(option) => `${option.label}: ${option.rating}`}
        isOptionDisabled={(option) => option.rating < 5}
        placeholder={Placeholder.SINGLE_SEARCHABLE}
        noOptionsText="No options"
        value={value}
        onChange={(_v: string, _e: ComboboxEvent, fullValue?: Option) =>
          setValue(fullValue)
        }
      />
    </div>
  )
}
