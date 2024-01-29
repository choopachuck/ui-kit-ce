import * as React from 'react'
import { ComboBox, Text, ComboboxEvent } from '@v-uik/base'
import { Placeholder } from './assets/Placeholders'

type Option = {
  value: string
  label: string
  rating: string
}

const options: Option[] = [
  { value: 'vanilla', label: 'Vanilla', rating: 'safe' },
  { value: 'chocolate', label: 'Chocolate', rating: 'good' },
  { value: 'strawberry', label: 'Strawberry', rating: 'wild' },
  { value: 'salted-caramel', label: 'Salted Caramel', rating: 'crazy' },
]

export const ReplaceLabel = (): JSX.Element => {
  const [value, setValue] = React.useState<Option>()

  return (
    <div style={{ width: 288 }}>
      <ComboBox
        canClear
        isSearchable
        clearInputOnBlur
        openOnFocus
        helperText="Helper Text"
        label="Label"
        options={options}
        getOptionLabel={(option) => `${option.label}: ${option.rating}`}
        getOptionValue={(option) => option.rating}
        placeholder={Placeholder.SINGLE_SEARCHABLE}
        noOptionsText="No options"
        value={value}
        onChange={(_v: string, _e: ComboboxEvent, fullValue?: Option) =>
          setValue(fullValue)
        }
      />
      <Text>Выбранное значение: {JSON.stringify(value)}</Text>
    </div>
  )
}
