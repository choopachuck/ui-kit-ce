import * as React from 'react'
import {
  ComboBox,
  ComboboxEvent,
  ComboboxChangeReason,
  MultiValue,
  Text,
} from '@v-uik/base'

type Option = {
  value: string
  label: string
  __isNew__?: boolean
}

const defaultOptions: Option[] = [
  { value: '1', label: 'Опция 1' },
  { value: '2', label: 'Опция 2' },
  { value: '3', label: 'Опция 3' },
  { value: '4', label: 'Опция 4' },
  { value: '5', label: 'Опция 5' },
  { value: '6', label: 'Длинная опция 6' },
  { value: '7', label: 'Опция 7' },
  { value: '8', label: 'Опция 8' },
  { value: '9', label: 'Опция 9' },
  { value: '10', label: 'Опция 10' },
  { value: '11', label: 'Опция 11' },
  { value: '12', label: 'Длинная опция 12' },
  { value: '13', label: 'Опция 13' },
  { value: '14', label: 'Опция 14' },
  { value: '15', label: 'Опция 15' },
]

export const Reasons = () => {
  const [value, setValue] = React.useState<MultiValue<Option>>()
  const [reason, setReason] = React.useState<ComboboxChangeReason>()

  return (
    <>
      <Text kind="body2">
        Примененный тип изменения поля: {reason || 'Выберите значение'}
      </Text>
      <br />
      <ComboBox
        multiple
        withTags
        canClear
        disableCloseOnSelect
        label="ComboBox"
        controlInnerProps={{ id: 'reasons-combobox' }}
        labelProps={{ htmlFor: 'reasons-combobox' }}
        options={defaultOptions}
        value={value}
        onChange={(
          _v: string[],
          _e: ComboboxEvent,
          fullValue?: MultiValue<Option>,
          reason?: ComboboxChangeReason
        ) => {
          setValue(fullValue)
          setReason(reason)
        }}
      />
    </>
  )
}
