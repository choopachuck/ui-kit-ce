import * as React from 'react'
import { Radio } from '../src'
import { fireEvent, render } from '@testing-library/react'

it('set value correctly', () => {
  const { getByRole } = render(<Radio />)

  const radioButton = getByRole('radio')
  expect(radioButton).not.toBeChecked()
  fireEvent.change(radioButton, { target: { checked: true } })
  expect(radioButton).toBeChecked()
})

it('set disable correctly', () => {
  const { getByRole } = render(<Radio disabled />)

  const radioButton = getByRole('radio')
  expect(radioButton).toHaveProperty('disabled', true)
  expect(
    (document.getElementsByTagName('span')[0] as Element).className
  ).toMatch(/disabled/i)
})

it('handle change correctly', () => {
  const value = 'someValue'
  const onChange = jest.fn()
  const { getByRole } = render(<Radio value={value} onChange={onChange} />)

  const radioButton = getByRole('radio')
  fireEvent.click(radioButton)
  expect(onChange).toBeCalledWith(value, expect.anything())
})
