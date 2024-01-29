import * as React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { BarDropdown, BarDropdownItem } from '../src'

it('show dropdown menu', async () => {
  const { getByRole, queryByRole } = render(
    <BarDropdown
      dropdownMenuProps={{
        content: <BarDropdownItem>item</BarDropdownItem>,
      }}
    >
      text
    </BarDropdown>
  )
  expect(queryByRole('menuitem')).not.toBeInTheDocument()
  fireEvent.mouseEnter(getByRole('button'))
  await waitFor(() => expect(getByRole('menuitem')).toBeInTheDocument())
})
