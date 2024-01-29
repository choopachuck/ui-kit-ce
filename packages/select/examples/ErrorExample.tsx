import * as React from 'react'
import { Select } from '@v-uik/base'

export const ErrorExample = (): React.ReactElement => {
  const [value, setValue] = React.useState('')

  const options = [
    { value: '', label: 'Choose an option' },
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Very very very very long option 3' },
  ]

  return (
    <div style={{ width: 220 }}>
      <Select
        error
        label="With icon"
        style={{ marginBottom: 20 }}
        options={options}
        value={value}
        onChange={setValue}
      />
      <Select
        error
        label="With icon and tooltip"
        errorIconTooltipProps={{
          dropdownProps: {
            placement: 'top',
            content: 'The field cannot be empty',
          },
        }}
        options={options}
        value={value}
        onChange={setValue}
      />
    </div>
  )
}
