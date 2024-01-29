import * as React from 'react'
import {
  ComboBox,
  createFilter,
  CheckboxGroup,
  LabelControl,
  Checkbox,
  ComboboxEvent,
} from '@v-uik/base'
import { Placeholder } from './assets/Placeholders'

type Option = {
  value: string
  label: string
}

const options: Option[] = [
  { value: 'ocean', label: 'Ocean' },
  { value: 'blue', label: 'Blue' },
  { value: 'purple', label: 'Purple' },
  { value: 'red', label: 'Red' },
  { value: 'orange', label: 'Orange' },
  { value: 'yellow', label: 'Yellow' },
  { value: 'green', label: 'Green' },
  { value: 'forest', label: 'Forest' },
  { value: 'slate', label: 'Slate' },
  { value: 'silver', label: 'Silver' },
]

export const AdvancedSearch = (): JSX.Element => {
  const [checkboxValue, setCheckboxValue] = React.useState<string[]>([])

  const handleChange = (value: string[] | undefined) => {
    setCheckboxValue(value ?? [])
  }

  const filterConfig = {
    stringify: (v: { value: string; label: string }) => v.label,
    ignoreCase: checkboxValue.includes('ignoreCase'),
    trim: checkboxValue.includes('trim'),
    matchFrom: checkboxValue.includes('matchFrom')
      ? ('start' as const)
      : ('any' as const),
  }

  const [value, setValue] = React.useState<Option>()

  return (
    <div style={{ width: 288 }}>
      <ComboBox
        isSearchable
        clearInputOnBlur
        filterOption={createFilter(filterConfig)}
        label="Label"
        options={options}
        placeholder={Placeholder.SINGLE_SEARCHABLE}
        value={value}
        noOptionsText="No options"
        onChange={(_v: string, _e: ComboboxEvent, fullValue?: Option) =>
          setValue(fullValue)
        }
      />

      <CheckboxGroup
        label="Search configuration"
        value={checkboxValue}
        direction="vertical"
        onChange={(_, value) => handleChange(value)}
      >
        <LabelControl
          label="Обрезать пробелы с начала и конца строк"
          name="trim"
          control={<Checkbox />}
        />
        <LabelControl
          name="ignoreCase"
          control={<Checkbox />}
          label="Игнорирование регистра"
        />
        <LabelControl
          name="matchFrom"
          control={<Checkbox />}
          label="Начинать поиск с начала строки"
        />
      </CheckboxGroup>
    </div>
  )
}
