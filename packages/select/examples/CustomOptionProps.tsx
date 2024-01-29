import * as React from 'react'
import { Select } from '@v-uik/base'

const Icon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="8" cy="8" r="2" fill="currentColor" />
  </svg>
)

export const CustomOptionProps = (): React.ReactElement => {
  const [value, setValue] = React.useState('')

  return (
    <div style={{ width: 250 }}>
      <Select
        options={[
          { value: '', label: 'Choose an option', prefix: <Icon /> },
          { value: '1', label: 'Option 1', prefix: <Icon /> },
          { value: '2', label: 'Option 1', prefix: <Icon />, disabled: true },
          { value: '3', label: 'Very very long option 3', prefix: <Icon /> },
        ]}
        value={value}
        onChange={setValue}
      />
    </div>
  )
}
