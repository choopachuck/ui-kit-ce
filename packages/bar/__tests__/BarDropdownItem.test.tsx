import * as React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { BarDropdownItem } from '../src'

it('show submenu on hover', async () => {
  const { getByRole, queryByText } = render(
    <BarDropdownItem
      interactive
      dropdownProps={{
        content: <BarDropdownItem>subitem</BarDropdownItem>,
      }}
    >
      item
    </BarDropdownItem>
  )
  expect(queryByText('subitem')).not.toBeInTheDocument()
  fireEvent.mouseEnter(getByRole('menuitem'))
  await waitFor(() => expect(queryByText('subitem')).toBeInTheDocument())
})
