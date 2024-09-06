import * as React from 'react'
import { Creatable } from '@v-uik/base'
import { Placeholder } from './assets/Placeholders'

interface IOption {
  value: string
  label: string
  disabled?: boolean
}

const options = [
  { value: '1', label: 'Lorem' },
  { value: '2', label: 'ipsum' },
  { value: '3', label: 'dolor' },
  { value: '4', label: 'sit' },
  { value: '5', label: 'amet' },
  { value: '6', label: 'consectetur' },
  { value: '7', label: 'adipiscing' },
  { value: '8', label: 'elit' },
  { value: '9', label: 'sed' },
  { value: '10', label: 'do' },
  { value: '11', label: 'eiusmod' },
  { value: '12', label: 'tempor incididunt', disabled: true },
  { value: '13', label: 'ut labore et' },
]

export const MultipleCreatable = (): JSX.Element => {
  const [value, setValue] = React.useState<IOption[]>([options[0]])

  return (
    <div style={{ width: 288 }}>
      <Creatable
        clearInputOnBlur
        canClear
        disableCloseOnSelect
        multiple
        openOnFocus
        withTags
        formatLabel={(v) => `Add "${v}"`}
        value={value}
        placeholder={Placeholder.MULTIPLE_SEARCHABLE}
        label="Label"
        options={options}
        onChange={setValue}
      />
    </div>
  )
}
