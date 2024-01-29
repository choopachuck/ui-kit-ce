import React from 'react'
import { Select } from '@v-uik/base'

export const ErrorMultiSelectExample = (): JSX.Element => {
  const [value, setValue] = React.useState<string[]>([])

  const options = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Very very very very long option 3' },
    { value: '4', label: 'Option 4' },
  ]

  return (
    <div style={{ width: 280 }}>
      <Select
        multiple
        error
        options={options}
        value={value}
        onChange={setValue}
      />
    </div>
  )
}
