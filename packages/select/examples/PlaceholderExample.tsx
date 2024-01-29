import * as React from 'react'
import { Select } from '@v-uik/base'

export const PlaceholderExample = (): React.ReactElement => {
  const [value, setValue] = React.useState('')

  return (
    <div style={{ width: 250 }}>
      <Select
        limitByWidth
        options={[
          { value: '', label: 'Choose an option' },
          { value: '1', label: 'Option 1' },
          { value: '2', label: 'Option 2' },
          { value: '3', label: 'Very long option 3' },
        ]}
        value={value}
        label="Заголовок"
        placeholder="Placeholder"
        onChange={setValue}
      />
    </div>
  )
}
