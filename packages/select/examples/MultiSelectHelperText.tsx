import React from 'react'
import { Select } from '@v-uik/base'

const options = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
  { value: '4', label: 'Option 4' },
  { value: '5', label: 'Option 5' },
  { value: '7', label: 'Option 7' },
  { value: '8', label: 'Option 8' },
  { value: '9', label: 'Option 9' },
  { value: '10', label: 'Option 10' },
  { value: '11', label: 'Option 11' },
  { value: '13', label: 'Option 13' },
  { value: '14', label: 'Option 14' },
]

export const MultiSelectHelperText = (): JSX.Element => {
  const [value, setValue] = React.useState<string[]>([])

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: 220, marginRight: 40 }}>
        <Select
          multiple
          limitByWidth
          value={value}
          options={options}
          helperText="Helper Text"
          onChange={setValue}
        />
      </div>

      <div style={{ width: 220 }}>
        <Select
          error
          multiple
          limitByWidth
          value={value}
          options={options}
          helperText="Error Text"
          onChange={setValue}
        />
      </div>
    </div>
  )
}
