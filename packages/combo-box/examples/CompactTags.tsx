import React from 'react'
import { ComboBox, InputNumber } from '@v-uik/base'
import { Placeholder } from './assets/Placeholders'

type Option = {
  value: string
  label: string
  disabled?: boolean
}

const options: Option[] = [
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
  { value: '12', label: 'Длинная опция 12', disabled: true },
  { value: '13', label: 'Опция 13' },
  { value: '14', label: 'Опция 14' },
  { value: '15', label: 'Опция 15' },
  { value: '16', label: 'Опция 16' },
  { value: '17', label: 'Опция 17' },
  { value: '18', label: 'Опция 18' },
  { value: '19', label: 'Опция 19' },
  { value: '20', label: 'Опция 20' },
  { value: '21', label: 'Опция 21' },
  { value: '22', label: 'Длинная опция 22' },
  { value: '23', label: 'Опция 23' },
  { value: '24', label: 'Опция 24' },
  { value: '25', label: 'Опция 25', disabled: true },
  { value: '26', label: 'Невероятно длинная опция имеющая номер 26' },
  { value: '27', label: 'Опция 27' },
  { value: '28', label: 'Опция 28' },
  { value: '29', label: 'Опция 29' },
]

export const CompactTags = (): JSX.Element => {
  const [value, setValue] = React.useState<Option[] | undefined>([
    options[0],
    options[5],
    options[25],
    options[28],
  ])
  const [limitTags, setLimitTags] = React.useState<number | null>(3)

  return (
    <div style={{ width: 288 }}>
      <InputNumber
        precision={0}
        value={limitTags}
        label="Limit the number of tags"
        onChange={setLimitTags}
      />
      <ComboBox
        multiple
        withTags
        isSearchable
        openOnFocus
        disableCloseOnSelect
        limitTags={limitTags as number}
        placeholder={Placeholder.MULTIPLE_SEARCHABLE}
        noOptionsText="No options"
        label="Label"
        value={value}
        options={options}
        onChange={(_v, _e, fullValue) => setValue(fullValue)}
      />
    </div>
  )
}
