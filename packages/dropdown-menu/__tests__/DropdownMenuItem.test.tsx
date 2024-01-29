import * as React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { DropdownMenuItem } from '../src'

it('open submenu on hover', async () => {
  const { getByRole, queryByText } = render(
    <DropdownMenuItem
      interactive
      dropdownProps={{
        content: (
          <>
            <DropdownMenuItem>subitem 1</DropdownMenuItem>
            <DropdownMenuItem>subitem 2</DropdownMenuItem>
          </>
        ),
      }}
    >
      item
    </DropdownMenuItem>
  )
  expect(queryByText('subitem 1')).not.toBeInTheDocument()
  fireEvent.mouseEnter(getByRole('menuitem'))
  await waitFor(() => expect(queryByText('subitem 1')).toBeInTheDocument())
})

it('closes submenu on blur', async () => {
  const { getByRole, getByText, queryByText } = render(
    <DropdownMenuItem
      interactive
      dropdownProps={{
        content: (
          <>
            <DropdownMenuItem>subitem 1</DropdownMenuItem>
            <DropdownMenuItem>subitem 2</DropdownMenuItem>
          </>
        ),
      }}
    >
      item
    </DropdownMenuItem>
  )
  expect(queryByText('subitem 1')).not.toBeInTheDocument()
  fireEvent.mouseEnter(getByRole('menuitem'))
  await waitFor(() => expect(queryByText('subitem 1')).toBeInTheDocument())
  fireEvent.blur(getByText('item').parentElement as HTMLElement)
  await waitFor(() => expect(queryByText('subitem 1')).not.toBeInTheDocument())
})
