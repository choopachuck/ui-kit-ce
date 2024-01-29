import React from 'react'
import { ComboBox } from '@v-uik/base'
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
  { value: '13', label: 'Lorem 13' },
  { value: '14', label: 'Lorem 14' },
  { value: '15', label: 'Lorem 15' },
  { value: '16', label: 'Lorem 16' },
  { value: '17', label: 'Lorem 17' },
  { value: '18', label: 'Lorem 18' },
  { value: '19', label: 'Lorem 19' },
  { value: '20', label: 'Lorem 20' },
  { value: '21', label: 'Lorem 21' },
  { value: '22', label: 'Longest lorem 22' },
  { value: '23', label: 'Lorem 23' },
  { value: '24', label: 'Lorem 24' },
  { value: '25', label: 'Lorem 25', disabled: true },
  { value: '26', label: 'Very and very longest lorem with num 26' },
  { value: '27', label: 'Lorem 27' },
  { value: '28', label: 'Lorem 28' },
  { value: '29', label: 'Lorem 29' },
  { value: '30', label: 'Very and very longest lorem with num 30' },
  { value: '31', label: 'Very and very longest lorem with num 30' },
  { value: '32', label: 'Very and very longest lorem with num 30' },
  { value: '33', label: 'Very and very longest lorem with num 30' },
  { value: '34', label: 'Very and very longest lorem with num 30' },
  { value: '35', label: 'Very and very longest lorem with num 30' },
  { value: '36', label: 'Very and very longest lorem with num 30' },
  { value: '37', label: 'Very and very longest lorem with num 30' },
  { value: '38', label: 'Very and very longest lorem with num 30' },
  { value: '39', label: 'Very and very longest lorem with num 30' },
  { value: '40', label: 'Very and very longest lorem with num 30' },
  { value: '41', label: 'Very and very longest lorem with num 30' },
  { value: '42', label: 'Very and very longest lorem with num 30' },
  { value: '43', label: 'Very and very longest lorem with num 30' },
  { value: '44', label: 'Very and very longest lorem with num 30' },
  { value: '45', label: 'Very and very longest lorem with num 30' },
]

export const DividerOptions = (): JSX.Element => {
  const [value, setValue] = React.useState<Option[] | undefined>([])

  return (
    <div style={{ width: 288 }}>
      <ComboBox
        multiple
        canClear
        withTags
        isSearchable
        clearInputOnBlur
        disableCloseOnSelect
        openOnFocus
        listProps={{ stripe: true }}
        label="Label"
        placeholder={Placeholder.MULTIPLE_SEARCHABLE}
        noOptionsText="No options"
        value={value}
        options={options}
        hideDropdownOnOutsideScroll={false}
        onChange={(_v, _e, fullValue) => setValue(fullValue)}
      />
    </div>
  )
}
