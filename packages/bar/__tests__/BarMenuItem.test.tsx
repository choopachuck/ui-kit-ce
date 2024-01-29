import * as React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { BarMenuItem } from '../src'

it('handle click', () => {
  const onClick = jest.fn()
  const { getByRole } = render(
    <BarMenuItem onClick={onClick}>item</BarMenuItem>
  )
  expect(onClick).toHaveBeenCalledTimes(0)
  fireEvent.click(getByRole('button'))
  expect(onClick).toHaveBeenCalledTimes(1)
})

it("doesn't handle click when disabled", () => {
  const onClick = jest.fn()
  const { getByRole } = render(
    <BarMenuItem disabled onClick={onClick}>
      item
    </BarMenuItem>
  )
  expect(onClick).toHaveBeenCalledTimes(0)
  fireEvent.click(getByRole('button'))
  expect(onClick).toHaveBeenCalledTimes(0)
})
