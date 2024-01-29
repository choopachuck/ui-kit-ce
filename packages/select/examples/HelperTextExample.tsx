import React from 'react'
import { Select } from '@v-uik/base'

export const HelperTextExample = (): JSX.Element => {
  const [value, setValue] = React.useState('')

  return (
    <>
      <div style={{ width: 220, marginBottom: 20 }}>
        <Select
          limitByWidth
          options={[
            { value: '', label: 'Choose an option' },
            { value: '1', label: 'Option 1' },
            { value: '2', label: 'Option 2' },
            { value: '3', label: 'Very long option 3' },
          ]}
          value={value}
          helperText="Helper Text"
          onChange={setValue}
        />
      </div>

      <div style={{ width: 220 }}>
        <Select
          error
          limitByWidth
          options={[
            { value: '', label: 'Choose an option' },
            { value: '1', label: 'Option 1' },
            { value: '2', label: 'Option 2' },
            { value: '3', label: 'Very long option 3' },
          ]}
          value={value}
          helperText="Error Text"
          onChange={setValue}
        />
      </div>
    </>
  )
}
