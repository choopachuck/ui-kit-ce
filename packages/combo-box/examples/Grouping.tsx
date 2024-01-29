import * as React from 'react'
import { ComboBox, ComboboxEvent } from '@v-uik/base'
import { Placeholder } from './assets/Placeholders'

type Option = {
  value: string
  label: string
}

const options: Option[] = [
  { value: '1', label: 'Lorem 1' },
  { value: '2', label: 'Options 2' },
  { value: '3', label: 'Optional 3' },
  { value: '4', label: 'First 11' },
  { value: '5', label: 'Last 5' },
  { value: '6', label: 'Lucan 6' },
  { value: '7', label: 'Fierro 7' },
  { value: '8', label: 'Long option number is so long option 11' },
  { value: '9', label: 'Option 9' },
  { value: '10', label: 'Option 10' },
  { value: '11', label: 'Lorem ispum 11' },
  { value: '12', label: 'Ferrari 12' },
]

export const Grouping = (): JSX.Element => {
  const [value, setValue] = React.useState<Option>()

  const mappedOptions = options.sort((a, b) => a.label.localeCompare(b.label)) // asc sort

  return (
    <div style={{ width: 288 }}>
      <ComboBox
        canClear
        isSearchable
        clearInputOnBlur
        openOnFocus
        groupBy={(option) => option.label.charAt(0)}
        helperText="Helper Text"
        label="Label"
        options={mappedOptions}
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
