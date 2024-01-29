import * as React from 'react'
import { ContainerMock } from './ContainerMock'
import { Bar, BarMenuItem, BarDropdown, BarDropdownItem } from '@v-uik/base'

export const BarMenuItemExample = (): JSX.Element => {
  const [selected, setSelected] = React.useState(1)

  const subDropdownProps = React.useMemo(() => {
    return {
      content: (
        <>
          <BarDropdownItem>Option 5</BarDropdownItem>
          <BarDropdownItem>Option 6</BarDropdownItem>
          <BarDropdownItem disabled>Option 7</BarDropdownItem>
        </>
      ),
    }
  }, [])

  const dropdownMenuProps = React.useMemo(() => {
    return {
      content: (
        <>
          <BarDropdownItem>Option 1</BarDropdownItem>
          <BarDropdownItem>Option 2</BarDropdownItem>
          <BarDropdownItem disabled dropdownProps={subDropdownProps}>
            Option 3
          </BarDropdownItem>
          <BarDropdownItem dropdownProps={subDropdownProps}>
            Option 4
          </BarDropdownItem>
        </>
      ),
    }
  }, [subDropdownProps])

  return (
    <ContainerMock style={{ marginBottom: '20em' }}>
      <Bar style={{ position: 'absolute' }}>
        <BarMenuItem selected={selected === 1} onClick={() => setSelected(1)}>
          Menu 1
        </BarMenuItem>
        <BarMenuItem selected={selected === 2} onClick={() => setSelected(2)}>
          Menu 2
        </BarMenuItem>
        <BarMenuItem
          disabled
          selected={selected === 3}
          onClick={() => setSelected(3)}
        >
          Menu 3
        </BarMenuItem>

        <BarDropdown dropdownMenuProps={dropdownMenuProps}>Menu 4</BarDropdown>
      </Bar>
    </ContainerMock>
  )
}
