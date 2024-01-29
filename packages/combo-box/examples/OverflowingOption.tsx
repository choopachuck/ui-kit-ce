import * as React from 'react'
import { ComboBox, ComboboxEvent, createUseStyles } from '@v-uik/base'

type Option = {
  value: string
  label: string
}

const options: Option[] = [
  { value: '1', label: 'Опция 1' },
  { value: '2', label: 'Опция 2' },
  { value: '3', label: 'Опция 3' },
  { value: '4', label: 'Опция 4' },
  { value: '5', label: 'Опция 5' },
  {
    value: '6',
    label:
      'Длинная опция 6 самая самая самая самая самая самая самая самая длинная',
  },
  { value: '7', label: 'Опция 7' },
  { value: '8', label: 'Опция 8' },
  { value: '9', label: 'Опция 9' },
  { value: '10', label: 'Опция 10' },
  { value: '11', label: 'Опция 11' },
  {
    value: '12',
    label:
      'Длинная опция 12 самая самая самая самая самая самая самая самая длинная',
  },
  { value: '13', label: 'Опция 13' },
  { value: '14', label: 'Опция 14' },
  { value: '15', label: 'Опция 15' },
]

const useStyles = createUseStyles({
  multilineDisplay: {
    "& [class^='text']": {
      textOverflow: 'clip',
      whiteSpace: 'pre-line',
      overflow: 'unset',
    },
  },
  list: {
    display: 'block',
  },
})

export const OverflowingOption = () => {
  const [value, setValue] = React.useState<Option>()
  const styles = useStyles()

  return (
    <div style={{ width: 300 }}>
      <ComboBox
        limitByWidth
        label="ComboBox"
        controlInnerProps={{ id: 'basic-combobox' }}
        labelProps={{ htmlFor: 'basic-combobox' }}
        classes={{
          option: styles.multilineDisplay,
          list: styles.list,
        }}
        options={options}
        value={value}
        onChange={(_v: string, _e: ComboboxEvent, fullValue?: Option) =>
          setValue(fullValue)
        }
      />
    </div>
  )
}
