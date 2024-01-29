import * as React from 'react'
import { ComboBox, ComboboxEvent, Text } from '@v-uik/base'
import { Placeholder } from './assets/Placeholders'

type Option = {
  value: string
  label: string
}

const options = [
  { value: '1', label: 'Lorem' },
  { value: '2', label: 'ipsum' },
  { value: '3', label: 'dolor' },
  { value: '4', label: 'sit' },
  { value: '5', label: 'amet' },
  { value: '6', label: 'consectetur' },
  { value: '7', label: 'adipiscing' },
  { value: '8', label: 'elit' },
  { value: '9', label: 'sed' },
  { value: '10', label: 'do' },
  { value: '11', label: 'eiusmod' },
  { value: '12', label: 'tempor incididunt', disabled: true },
  { value: '13', label: 'ut labore et' },
]

export const DropdownSubscribe = (): JSX.Element => {
  const [value, setValue] = React.useState<Option[] | undefined>([options[0]])
  const [dropdownState, setDropdownState] = React.useState<boolean>(false)

  const onStateChange = React.useCallback(
    (isOpen) => setDropdownState(isOpen),
    [setDropdownState]
  )

  return (
    <div style={{ width: 288 }}>
      <Text>dropdown is opened: {String(dropdownState)}</Text>
      <ComboBox
        canClear
        disableCloseOnSelect
        multiple
        isSearchable
        withTags
        placeholder={Placeholder.MULTIPLE_SEARCHABLE}
        noOptionsText="No options"
        value={value}
        label="Label"
        options={options}
        dropdownProps={{ onStateChange }}
        onChange={(_v: string[], _e: ComboboxEvent, fullValue?: Option[]) => {
          setValue(fullValue)
        }}
      />
    </div>
  )
}
