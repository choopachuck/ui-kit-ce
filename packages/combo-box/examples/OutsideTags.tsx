import * as React from 'react'
import { ComboBox, Tag } from '@v-uik/base'
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
  { value: '12', label: 'Longest lorem 12', disabled: true },
]

export const OutsideTags = (): JSX.Element => {
  const [value, setValue] = React.useState<Option[]>([
    options[0],
    options[5],
    options[9],
  ])

  const onDelete = (index: number) => {
    setValue((prev) => prev.filter((_x, i) => i !== index))
  }

  const onDeleteAll = () => {
    setValue([])
  }

  return (
    <div style={{ width: 288 }}>
      {value?.map(({ value, label }, index) => (
        <Tag
          key={value}
          selected
          style={{ margin: '0 4px 4px 0' }}
          kind="lite"
          onDelete={() => onDelete(index)}
          onClick={() => onDelete(index)}
        >
          {label}
        </Tag>
      ))}
      <Tag
        tabIndex={0}
        style={{ margin: '0 4px 4px 0' }}
        kind="lite"
        onClick={onDeleteAll}
      >
        Очистить все
      </Tag>
      <ComboBox
        multiple
        disableVisibleSelectedValue
        disableCloseOnSelect
        placeholder={Placeholder.MULTIPLE}
        label="Label"
        rows={6}
        value={value}
        options={options}
        onChange={(_v, _e, fullValue) => setValue(fullValue ?? [])}
      />
    </div>
  )
}
