import * as React from 'react'
import { Autocomplete } from '@v-uik/base'

const options = [
  { value: '1', label: 'Google' },
  { value: '2', label: 'google' },
  { value: '3', label: 'dsadq' },
  { value: '4', label: 'dsadqw' },
  { value: '5', label: 'dsadqwer' },
  { value: '6', label: 'chocolate' },
]

export const BasicAutocomplete = (): JSX.Element => {
  const [value, setValue] = React.useState<string>('')

  return (
    <div style={{ width: 250 }}>
      <Autocomplete
        canClear
        helperText="Helper Text"
        label="Label"
        options={options}
        placeholder="Search..."
        value={value}
        onChange={setValue}
      />
    </div>
  )
}
