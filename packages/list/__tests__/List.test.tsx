import * as React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { List, ListItem } from '../src'

it("shouldn't focus if non-interactive", () => {
  const { getByTestId } = render(<List data-testid="testId" />)
  const list = getByTestId('testId')
  fireEvent.focus(list)
  expect(list.getAttribute('tabindex')).toBeFalsy()
  expect(document.activeElement === list).toBeFalsy()
})

it('should become unfocusable if child focused', () => {
  const { getByRole } = render(
    <List interactive>
      <ListItem>1</ListItem>
    </List>
  )
  const list = getByRole('menu')
  const listItem = getByRole('menuitem')
  expect(list.getAttribute('tabindex')).toBe('0')
  fireEvent.focus(listItem)
  expect(list.getAttribute('tabindex')).toBe('-1')
})

it('should focus first item when focused', () => {
  const { getByRole, getAllByRole } = render(
    <List interactive>
      <ListItem>1</ListItem>
      <ListItem>2</ListItem>
      <ListItem>3</ListItem>
    </List>
  )
  const list = getByRole('menu')
  const listItems = getAllByRole('menuitem')
  fireEvent.focus(list)
  expect(document.activeElement === listItems[0]).toBeTruthy()
})

it('should focus selected item when focused', () => {
  const { getByRole, getAllByRole } = render(
    <List interactive>
      <ListItem>1</ListItem>
      <ListItem>2</ListItem>
      <ListItem selected>3</ListItem>
    </List>
  )
  const list = getByRole('menu')
  const listItems = getAllByRole('menuitem')
  fireEvent.focus(list)
  expect(document.activeElement === listItems[2]).toBeTruthy()
})

it('should become focusable when list lost focus', () => {
  const { getByRole } = render(
    <List interactive>
      <ListItem>1</ListItem>
    </List>
  )
  const list = getByRole('menu')
  fireEvent.focus(list)
  expect(list.getAttribute('tabindex')).toBe('-1')
  fireEvent.blur(list)
  expect(list.getAttribute('tabindex')).toBe('0')
})

it('should navigate with keyboard correctly', () => {
  const { getByRole, getAllByRole } = render(
    <List interactive>
      <ListItem>1</ListItem>
      <ListItem>2</ListItem>
      <ListItem>3</ListItem>
    </List>
  )
  const list = getByRole('menu')
  const listItems = getAllByRole('menuitem')
  fireEvent.focus(list)
  fireEvent.keyDown(document.activeElement || list, { key: 'ArrowDown' })
  expect(document.activeElement === listItems[1]).toBeTruthy()
  fireEvent.keyDown(document.activeElement || list, { key: 'ArrowDown' })
  expect(document.activeElement === listItems[2]).toBeTruthy()
  fireEvent.keyDown(document.activeElement || list, { key: 'ArrowUp' })
  expect(document.activeElement === listItems[1]).toBeTruthy()
})

it('should navigate through disabled elements correctly', () => {
  const { getByRole, getAllByRole } = render(
    <List interactive>
      <ListItem>1</ListItem>
      <ListItem disabled>2</ListItem>
      <ListItem>3</ListItem>
    </List>
  )
  const list = getByRole('menu')
  const listItems = getAllByRole('menuitem')
  fireEvent.focus(list)
  fireEvent.keyDown(document.activeElement || list, { key: 'ArrowDown' })
  expect(document.activeElement === listItems[2]).toBeTruthy()
  fireEvent.keyDown(document.activeElement || list, { key: 'ArrowUp' })
  expect(document.activeElement === listItems[0]).toBeTruthy()
})

it('should navigate through edges correctly', () => {
  const { getByRole, getAllByRole } = render(
    <List interactive>
      <ListItem>1</ListItem>
      <ListItem>2</ListItem>
    </List>
  )
  const list = getByRole('menu')
  const listItems = getAllByRole('menuitem')
  fireEvent.focus(list)
  fireEvent.keyDown(document.activeElement || list, { key: 'ArrowUp' })
  expect(document.activeElement === listItems[1]).toBeTruthy()
  fireEvent.keyDown(document.activeElement || list, { key: 'ArrowDown' })
  expect(document.activeElement === listItems[0]).toBeTruthy()
})
