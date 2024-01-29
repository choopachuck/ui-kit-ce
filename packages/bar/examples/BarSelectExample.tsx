import * as React from 'react'
import { Bar, BarButton, BarSelect } from '@v-uik/base'
import { IconBurger } from './assets/IconBurger'
import { ContainerMock } from './ContainerMock'

const options = [
  { value: '', label: 'Select' },
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
]

export const BarSelectExample = (): JSX.Element => {
  const [selectValue, setSelectValue] = React.useState('')

  const handleChangeSelectValue = (value: string) => {
    setSelectValue(value)
  }

  return (
    <ContainerMock>
      <Bar style={{ position: 'absolute' }}>
        <BarButton icon={<IconBurger />} />

        <BarSelect
          style={{ marginLeft: 'auto' }}
          options={options}
          value={selectValue}
          onChange={handleChangeSelectValue}
        />
      </Bar>
    </ContainerMock>
  )
}
