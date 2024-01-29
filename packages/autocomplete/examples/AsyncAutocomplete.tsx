import * as React from 'react'
import { Autocomplete } from '@v-uik/base'

const defaultOptions = [
  { value: '1', label: 'dsa' },
  { value: '2', label: 'dsad' },
  { value: '3', label: 'dsadq' },
  { value: '4', label: 'dsadqw' },
  { value: '5', label: 'dsadqwer' },
  { value: '6', label: 'chocolate' },
]

export const AsyncAutocomplete = (): JSX.Element => {
  const [value, setValue] = React.useState<string>('')
  const [options, setOptions] = React.useState(defaultOptions)
  const [loading, setLoading] = React.useState(false)

  const handleRequest = React.useCallback(
    (query: string) => {
      if (query.length > 2) {
        setLoading(true)
        setOptions((prev) =>
          prev.map((x, i) => ({
            ...x,
            label: `${defaultOptions[i].label}${query}`,
          }))
        )
        setTimeout(() => {
          setLoading(false)
        }, 3000)
      }
    },
    [setLoading]
  )

  return (
    <div style={{ width: 250 }}>
      <Autocomplete
        canClear
        options={options}
        placeholder="Search..."
        value={value}
        loading={loading}
        onChange={setValue}
        onInputChange={handleRequest}
      />
    </div>
  )
}
