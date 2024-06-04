import * as React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { DropdownMenu, DropdownMenuProps, DropdownMenuItem } from '../src'
import { Button } from '../../button/src'

const Component = (props: Partial<DropdownMenuProps<'ul'>>) => (
  <DropdownMenu
    action="click"
    content={<DropdownMenuItem>item</DropdownMenuItem>}
    {...props}
  >
    <Button>button</Button>
  </DropdownMenu>
)

it('show dropdown menu', () => {
  const { getByRole } = render(<Component />)
  fireEvent.click(getByRole('button'))
  expect(getByRole('menuitem')).toBeInTheDocument()
})

it('does not focus list when clicked', () => {
  const { getByRole } = render(<Component />)
  fireEvent.click(getByRole('button'))
  expect(document.activeElement).not.toBe(getByRole('menuitem'))
})

it('focus list with keyboard navigation', () => {
  const { getByRole } = render(<Component />)
  const button = getByRole('button')
  button.focus()
  fireEvent.keyDown(button, { key: 'Enter' })
  expect(document.activeElement).toBe(button)
  expect(getByRole('menuitem')).toBeInTheDocument()
  fireEvent.keyDown(button, { key: 'ArrowDown' })
  expect(document.activeElement).toBe(getByRole('menuitem'))
})

it('opens when arrow key typed', () => {
  const { getByRole } = render(<Component />)
  fireEvent.keyDown(getByRole('button'), { key: 'ArrowDown' })
  expect(getByRole('menuitem')).toBeInTheDocument()
})

it('closes on tab button pressed', () => {
  const { getByRole, queryByRole } = render(<Component />)
  fireEvent.click(getByRole('button'))
  expect(getByRole('menuitem')).toBeInTheDocument()
  fireEvent.keyDown(getByRole('menuitem'), { key: 'Tab' })
  expect(queryByRole('menuitem')).not.toBeInTheDocument()
})

it('closes on esc button pressed', () => {
  const { getByRole, queryByRole } = render(<Component />)
  fireEvent.click(getByRole('button'))
  expect(getByRole('menuitem')).toBeInTheDocument()
  fireEvent.keyDown(getByRole('menuitem'), { key: 'Escape' })
  expect(queryByRole('menuitem')).not.toBeInTheDocument()
})

it('visible list after hover on item', () => {
  const { getByRole } = render(<Component />)
  fireEvent.click(getByRole('button'))
  expect(getByRole('menuitem')).toBeInTheDocument()
  fireEvent.mouseEnter(getByRole('menuitem'))
  expect(getByRole('menuitem')).toBeInTheDocument()
  fireEvent.mouseLeave(getByRole('menuitem'))
  expect(getByRole('menuitem')).toBeInTheDocument()
})

it('closes after click on the button second time SBTSUPPORT-32770', () => {
  const { getByRole, queryByRole } = render(<Component />)

  expect(queryByRole('menuitem')).not.toBeInTheDocument()

  fireEvent.click(getByRole('button'))

  expect(queryByRole('menuitem')).toBeInTheDocument()

  fireEvent.click(getByRole('button'))

  expect(queryByRole('menuitem')).not.toBeInTheDocument()

  fireEvent.click(getByRole('button'))

  expect(queryByRole('menuitem')).toBeInTheDocument()
})

it('closes after click if action is contextMenu', () => {
  const { getByRole, queryByRole } = render(<Component action="contextMenu" />)

  expect(queryByRole('menuitem')).not.toBeInTheDocument()

  fireEvent.click(getByRole('button'))

  expect(queryByRole('menuitem')).not.toBeInTheDocument()

  fireEvent.contextMenu(getByRole('button'))

  expect(queryByRole('menuitem')).toBeInTheDocument()

  // в тесте клик не работает, т.к. в коде висит обработчик на mouseDown
  fireEvent.mouseDown(getByRole('button'))

  expect(queryByRole('menuitem')).not.toBeInTheDocument()
})
