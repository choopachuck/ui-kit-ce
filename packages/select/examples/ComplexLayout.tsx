import * as React from 'react'
import { Select } from '@v-uik/base'

const OptionLabel = ({ name, date }: { name: string; date: string }) => {
  return (
    <div style={{ display: 'flex' }}>
      <span style={{ width: '5rem' }}>{name}</span>
      <span style={{ marginLeft: '1rem', width: '5rem' }}>{date}</span>
    </div>
  )
}

export const ComplexLayout = (): React.ReactElement => {
  const [value, setValue] = React.useState('')

  return (
    <div style={{ width: 250 }}>
      <Select
        options={[
          { value: '', label: 'Choose an option' },
          {
            value: '0',
            label: <OptionLabel name="Name" date="Date of Birth" />,
            disabled: true,
          },
          {
            value: '1',
            label: <OptionLabel name="Alex" date="21/01/1987" />,
          },
          {
            value: '2',
            label: <OptionLabel name="Vladimir" date="12/07/1992" />,
          },
          { value: '3', label: <OptionLabel name="Igor" date="03/05/1985" /> },
        ]}
        value={value}
        onChange={setValue}
      />
    </div>
  )
}
