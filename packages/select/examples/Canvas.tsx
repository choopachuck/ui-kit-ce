import * as React from 'react'
import { Select } from '@v-uik/base'

const options = [
  { value: '', label: 'Выберите опцию' },
  { value: '1', label: 'Опция 1' },
  { value: '2', label: 'Опция 2' },
  { value: '3', label: 'Опция 3' },
  { value: '4', label: 'Опция 4' },
  { value: '5', label: 'Опция 5' },
  { value: '6', label: 'Опция 6' },
  { value: '7', label: 'Опция 7' },
  { value: '8', label: 'Достаточно длинная опция под номером 8' },
  { value: '9', label: 'Достаточно длинная опция под номером 9' },
  { value: '10', label: 'Достаточно длинная опция под номером 10' },
]

export default () => {
  const [value, setValue] = React.useState('')

  return (
    <div style={{ width: '20rem' }}>
      <Select
        label="Select"
        selectButtonProps={{
          id: 'basic-select',
        }}
        labelProps={{
          htmlFor: 'basic-select',
        }}
        options={options}
        value={value}
        onChange={setValue}
      />
    </div>
  )
}
