import * as React from 'react'
import { Autocomplete, Divider } from '@v-uik/base'
import { SearchIcon } from './assets/SearchIcon'

const options = [
  { value: '1', label: 'dsa' },
  { value: '2', label: 'dsad' },
  { value: '3', label: 'dsadq' },
  { value: '4', label: 'dsadqw' },
  { value: '5', label: 'dsadqwer' },
  { value: '6', label: 'chocolate' },
]

export const SearchAutocomplete = (): JSX.Element => {
  const [value, setValue] = React.useState<string>('')
  const [searched, setSearched] = React.useState<string | undefined>(undefined)

  const search = React.useCallback(() => {
    setSearched(value)
  }, [setSearched, value])

  return (
    <div style={{ width: 250 }}>
      <Autocomplete
        canClear
        helperText={searched && `Search query ${searched}`}
        options={options}
        placeholder="Search..."
        value={value}
        label="Type 'd'"
        inputPrefix={
          <SearchIcon style={{ cursor: 'pointer' }} onClick={search} />
        }
        inputSuffix={
          <>
            <Divider direction="vertical" />
            <SearchIcon onClick={search} />
          </>
        }
        onChange={setValue}
      />
    </div>
  )
}
