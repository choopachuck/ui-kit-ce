import * as React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { BarButton } from '../src'

it('handle click', () => {
  const onClick = jest.fn()
  const { getByRole } = render(<BarButton onClick={onClick}>button</BarButton>)
  expect(onClick).toHaveBeenCalledTimes(0)
  fireEvent.click(getByRole('button'))
  expect(onClick).toHaveBeenCalledTimes(1)
})

it("doesn't handle click when disabled", () => {
  const onClick = jest.fn()
  const { getByRole } = render(
    <BarButton disabled onClick={onClick}>
      button
    </BarButton>
  )
  expect(onClick).toHaveBeenCalledTimes(0)
  fireEvent.click(getByRole('button'))
  expect(onClick).toHaveBeenCalledTimes(0)
})
