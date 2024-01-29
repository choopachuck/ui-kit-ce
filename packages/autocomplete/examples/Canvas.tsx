import * as React from 'react'
import { Autocomplete } from '@v-uik/base'

const options = [
  { value: '1', label: 'dsa' },
  { value: '2', label: 'dsad' },
  { value: '3', label: 'dsadq' },
  { value: '4', label: 'dsadqw' },
  { value: '5', label: 'dsadqwer' },
  { value: '6', label: 'Google' },
  { value: '7', label: 'google' },
  { value: '8', label: 'g' },
]

export default () => {
  const [value, setValue] = React.useState('')

  return (
    <Autocomplete
      label="Autocomplete"
      labelProps={{
        htmlFor: 'basic-autocomplete',
      }}
      controlInnerProps={{
        id: 'basic-autocomplete',
      }}
      options={options}
      value={value}
      onChange={setValue}
    />
  )
}
