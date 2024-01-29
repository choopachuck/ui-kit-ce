import * as React from 'react'
import { ComboBox } from '@v-uik/base'
import { Placeholder } from './assets/Placeholders'

type Option = {
  value: string
  label: string
}

const options = [
  { value: 'vanilla', label: 'Vanilla' },
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'salted-caramel', label: 'Salted Caramel' },
]

export const ReplaceDelimiter = (): JSX.Element => {
  const [value, setValue] = React.useState<Option[] | undefined>([])

  return (
    <div style={{ width: 288 }}>
      <ComboBox
        multiple
        disableCloseOnSelect
        helperText="Helper Text"
        label="Label"
        options={options}
        placeholder={Placeholder.MULTIPLE}
        delimiter=" - "
        value={value}
        onChange={(_v, _e, fullValue) => setValue(fullValue)}
      />
    </div>
  )
}
