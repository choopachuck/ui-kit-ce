import * as React from 'react'
import { Creatable } from '@v-uik/base'
import { Placeholder } from './assets/Placeholders'

type Option = {
  value: string
  label: string
}

const defaultOptions: Option[] = [
  { value: 'vanilla', label: 'Vanilla' },
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'salted-caramel', label: 'Salted Caramel' },
]

const createOption = (label: string) => ({
  label,
  value: label,
  __isNew__: true,
})

export const CreatableWithUpdatedOptions = (): JSX.Element => {
  const [isDisabled, setIsDisabled] = React.useState<boolean>(false)
  const [value, setValue] = React.useState<Option | null>(null)
  const [options, setOptions] = React.useState(defaultOptions)

  const onCreateOption = (inputValue: string) => {
    setIsDisabled(true)
    setTimeout(() => {
      const newOption = createOption(inputValue)

      setIsDisabled(false)
      setOptions((prev) => [...prev, newOption])
      setValue(newOption)
    }, 1000)
  }

  return (
    <div style={{ width: 288 }}>
      <Creatable
        canClear
        clearInputOnBlur
        openOnFocus
        formatLabel={(v) => `Add "${v}"`}
        helperText="Helper Text"
        label="Label"
        options={options}
        placeholder={Placeholder.SINGLE_SEARCHABLE}
        noOptionsText="No options"
        value={value}
        disabled={isDisabled}
        onCreateOption={onCreateOption}
        onChange={setValue}
      />
    </div>
  )
}
