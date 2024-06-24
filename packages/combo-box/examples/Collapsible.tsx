import * as React from 'react'
import { ComboBox, ComboboxEvent, createUseStyles } from '@v-uik/base'
import { Placeholder } from './assets/Placeholders'

type Option = {
  value: string
  label: string
}

const useStyles = createUseStyles({
  inputContent: {
    flexWrap: 'nowrap',
  },
})

const options = [
  { value: '1', label: 'Lorem 1' },
  { value: '2', label: 'Options 2' },
  { value: '3', label: 'Optional 3' },
  { value: '4', label: 'First 11' },
  { value: '5', label: 'Last 5' },
  { value: '6', label: 'Lucan 6' },
  { value: '7', label: 'Fierro 7' },
  { value: '8', label: 'Long option number is so long option 11' },
  { value: '9', label: 'Option 9' },
  { value: '10', label: 'Option 10' },
  { value: '11', label: 'Lorem ispum 11' },
  { value: '12', label: 'Ferrari 12' },
]

const defaultLimitTags = 1

export const Collapsible = (): JSX.Element => {
  const [value, setValue] = React.useState<Option[] | undefined>([])
  const [dropdownOpen, setDropdownState] = React.useState(false)

  const limitTags = React.useMemo(() => {
    return dropdownOpen ? undefined : defaultLimitTags
  }, [dropdownOpen])

  const classes = useStyles()

  return (
    <div style={{ width: 288 }}>
      <ComboBox
        multiple
        canClear
        isSearchable
        clearInputOnBlur
        disableCloseOnSelect
        withTags
        limitTags={limitTags}
        helperText="Helper Text"
        label="Label"
        options={options}
        placeholder={Placeholder.MULTIPLE_SEARCHABLE}
        noOptionsText="No options"
        dropdownProps={{
          onStateChange: setDropdownState,
        }}
        classes={{ inputContent: limitTags ? classes.inputContent : undefined }}
        value={value}
        onChange={(_v: string[], _e: ComboboxEvent, fullValue?: Option[]) => {
          setValue(fullValue)
        }}
      />
    </div>
  )
}
