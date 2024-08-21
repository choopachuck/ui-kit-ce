import * as React from 'react'
import { ComboBox, ComboboxEvent } from '../../src'

type Option = {
  value: string
  label: string
}

const options: Option[] = [
  { value: '0', label: 'Нулевое' },
  { value: '1', label: 'Первое' },
  { value: '2', label: 'Второе' },
  { value: '3', label: 'Третье' },
]

export const SearchableAndClearOnBLur: React.FC = () => {
  const [value, setValue] = React.useState<Option>()

  return (
    <ComboBox
      isSearchable
      clearInputOnBlur
      label="ComboBox"
      controlInnerProps={{ id: 'basic-combobox' }}
      labelProps={{ htmlFor: 'basic-combobox' }}
      options={options}
      value={value}
      classes={{
        text: 'text',
      }}
      onChange={(_v: string, _e: ComboboxEvent, fullValue?: Option) =>
        setValue(fullValue)
      }
    />
  )
}
