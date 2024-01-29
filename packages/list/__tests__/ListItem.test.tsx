import * as React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { ListItem } from '../src'

it("shouldn't focus if non-interactive", () => {
  const { getByTestId } = render(<ListItem data-testid="testId" />)
  const item = getByTestId('testId')
  fireEvent.focus(item)
  expect(item.getAttribute('tabindex')).toBeFalsy()
  expect(document.activeElement === item).toBeFalsy()
})

it("shouldn't focus if disabled", () => {
  const { getByRole } = render(<ListItem interactive disabled />)
  const item = getByRole('menuitem')
  fireEvent.focus(item)
  expect(item.getAttribute('tabindex')).toBeFalsy()
  expect(document.activeElement === item).toBeFalsy()
})

it('should not focus on mouseEnter', () => {
  const onMouseEnter = jest.fn()
  const { getByRole } = render(
    <ListItem interactive onMouseEnter={onMouseEnter} />
  )
  const item = getByRole('menuitem')
  expect(onMouseEnter).toBeCalledTimes(0)
  fireEvent.mouseEnter(item)
  expect(onMouseEnter).toBeCalledTimes(1)
  expect(document.activeElement === item).toBeFalsy()
})

it('should handle click from keyboard', () => {
  const onKeyDown = jest.fn()
  const onClick = jest.fn()
  const { getByRole } = render(
    <ListItem interactive onKeyDown={onKeyDown} onClick={onClick} />
  )
  const item = getByRole('menuitem')
  expect(onKeyDown).toBeCalledTimes(0)
  expect(onClick).toBeCalledTimes(0)
  fireEvent.focus(item)
  fireEvent.keyDown(item, { key: 'Enter' })
  expect(onKeyDown).toBeCalledTimes(1)
  expect(onClick).toBeCalledTimes(1)
})

it('set divider after option correctly', () => {
  const { getByTestId } = render(<ListItem stripe data-testid="testId" />)

  const element = getByTestId('testId')

  expect(element.className).toMatch(/stripe/)
})
