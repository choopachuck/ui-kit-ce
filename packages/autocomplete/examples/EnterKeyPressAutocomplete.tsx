import * as React from 'react'
import { Autocomplete, ComboboxChangeReason, ComboboxEvent } from '@v-uik/base'

const options = [
  { value: '1', label: 'Google' },
  { value: '2', label: 'google' },
  { value: '3', label: 'dsadq' },
  { value: '4', label: 'dsadqw' },
  { value: '5', label: 'dsadqwer' },
  { value: '6', label: 'chocolate' },
]

export const EnterKeyPressAutocomplete = (): JSX.Element => {
  const [value, setValue] = React.useState<string>('')

  const handleSubmit = (v: string) => {
    alert(v)
  }

  const handleKeydown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      handleSubmit(value)
    }
  }

  const handleChange = (
    value: string,
    event: ComboboxEvent,
    reason?: ComboboxChangeReason
  ) => {
    setValue(value)
    if (reason === 'select') {
      handleSubmit(value)
    }
  }

  return (
    <div style={{ width: 250 }}>
      <Autocomplete
        canClear
        label="Autocomplete"
        controlInnerProps={{
          onKeyDown: handleKeydown,
        }}
        options={options}
        value={value}
        onChange={handleChange}
      />
    </div>
  )
}
