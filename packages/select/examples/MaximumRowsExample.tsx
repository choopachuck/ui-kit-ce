import React from 'react'
import { Select } from '@v-uik/base'

const options = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
  { value: '4', label: 'Option 4' },
  { value: '5', label: 'Option 5' },
  { value: '6', label: 'Very long option 6' },
  { value: '7', label: 'Option 7' },
  { value: '8', label: 'Option 8' },
  { value: '9', label: 'Option 9' },
  { value: '10', label: 'Option 10' },
  { value: '11', label: 'Option 11' },
  { value: '12', label: 'Very long option 12' },
  { value: '13', label: 'Option 13' },
  { value: '14', label: 'Option 14' },
  { value: '15', label: 'Option 15' },
  { value: '16', label: 'Option 16' },
  { value: '17', label: 'Option 17' },
  { value: '18', label: 'Option 18' },
  { value: '19', label: 'Option 19' },
  { value: '20', label: 'Option 20' },
]

export const MaximumRowsExample = (): JSX.Element => {
  const [value, setValue] = React.useState<string[]>([])

  return (
    <div style={{ width: 288 }}>
      <Select
        limitByWidth
        multiple
        options={options}
        value={value}
        rows={4}
        onChange={setValue}
      />
    </div>
  )
}
