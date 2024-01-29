import * as React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Checkbox } from '../src'

it('renders correctly', () => {
  const { getByRole } = render(<Checkbox checked={false} />)
  expect(getByRole('checkbox')).toBeInTheDocument()
})

it('render checked icon', () => {
  const { rerender } = render(<Checkbox checked={false} />)
  expect(document.querySelector('polyline')).not.toBeInTheDocument()
  rerender(<Checkbox checked />)
  expect(document.querySelector('polyline')).toBeInTheDocument()
})

it('render indeterminate icon', () => {
  const { rerender } = render(<Checkbox />)
  expect(document.querySelector('line')).not.toBeInTheDocument()
  rerender(<Checkbox indeterminate />)
  expect(document.querySelector('line')).toBeInTheDocument()
})

it('handle change callback', () => {
  const onChange = jest.fn()
  const { getByRole } = render(<Checkbox onChange={onChange} />)
  expect(onChange).toHaveBeenCalledTimes(0)
  fireEvent.click(getByRole('checkbox'))
  expect(onChange).toHaveBeenCalledTimes(1)
})

it("doesn't handle change callback when disabled", () => {
  const onChange = jest.fn()
  const { getByRole } = render(<Checkbox disabled onChange={onChange} />)
  expect(onChange).toHaveBeenCalledTimes(0)
  fireEvent.change(getByRole('checkbox'))
  expect(onChange).toHaveBeenCalledTimes(0)
})
