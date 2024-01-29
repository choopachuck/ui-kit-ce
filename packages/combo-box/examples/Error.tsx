import * as React from 'react'
import { ComboBox, ComboboxEvent } from '@v-uik/base'
import { Placeholder } from './assets/Placeholders'

type Option = {
  value: string
  label: string
}

const options = [
  { value: '1', label: 'Lorem 1' },
  { value: '2', label: 'Lorem 2' },
  { value: '3', label: 'Lorem 3' },
  { value: '4', label: 'Lorem 4' },
  { value: '5', label: 'Lorem 5' },
  { value: '6', label: 'Longest lorem 6' },
  { value: '7', label: 'Lorem 7' },
  { value: '8', label: 'Lorem 8' },
  { value: '9', label: 'Lorem 9' },
  { value: '10', label: 'Lorem 10' },
  { value: '11', label: 'Lorem 11' },
  { value: '12', label: 'Longest lorem 121212121212121212' },
]

export const Error = (): JSX.Element => {
  const [value, setValue] = React.useState<Option>()

  return (
    <div style={{ width: 288 }}>
      <ComboBox
        canClear
        showErrorIcon
        error={!value}
        label="Label"
        placeholder={Placeholder.SINGLE}
        value={value}
        options={options}
        helperText={!value ? 'Field cannot be empty' : ''}
        errorIconTooltipProps={{
          dropdownProps: {
            placement: 'top',
            content: 'Field cannot be empty',
          },
        }}
        onChange={(_v: string, _e: ComboboxEvent, fullValue?: Option) =>
          setValue(fullValue)
        }
      />
    </div>
  )
}
