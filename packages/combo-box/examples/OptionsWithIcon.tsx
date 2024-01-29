import React from 'react'
import { ComboBox } from '@v-uik/base'
import { Icon } from './assets/Icon'
import { Placeholder } from './assets/Placeholders'

type Option = {
  value: string
  label: string
}

const options = [
  { value: '1', label: 'Lorem 1', prefix: <Icon /> },
  { value: '2', label: 'Lorem 2', prefix: <Icon /> },
  { value: '3', label: 'Lorem 3', prefix: <Icon /> },
  { value: '4', label: 'Lorem 4', prefix: <Icon /> },
]

export const OptionsWithIcon = (): JSX.Element => {
  const [value, setValue] = React.useState<Option[] | undefined>([])

  return (
    <div style={{ width: 288 }}>
      <ComboBox
        canClear
        disableCloseOnSelect
        limitByWidth
        multiple
        openOnFocus
        withTags
        label="Label"
        placeholder={Placeholder.MULTIPLE}
        value={value}
        options={options}
        onChange={(_v, _e, fullValue) => setValue(fullValue)}
      />
    </div>
  )
}
