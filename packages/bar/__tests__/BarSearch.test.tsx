import * as React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { BarSearch } from '../src'

it('set input value correctly', () => {
  const { getByRole } = render(<BarSearch value="text" />)
  expect(getByRole('textbox')).toHaveValue('text')
})

it('handle changing value correctly', () => {
  const onChange = jest.fn()
  const { getByRole } = render(<BarSearch value="text" onChange={onChange} />)
  expect(onChange).toHaveBeenCalledTimes(0)
  fireEvent.change(getByRole('textbox'), { target: { value: 'new value' } })
  expect(onChange).toHaveBeenCalledTimes(1)
  expect(onChange).toHaveBeenCalledWith('new value', expect.anything(), 'input')
})

it('handle clear value correctly', () => {
  const handleChange = jest.fn()
  const inputValue = 'new value'
  const { getByRole, rerender } = render(
    <BarSearch
      inputProps={{ canClear: true }}
      value=""
      onChange={handleChange}
    />
  )
  fireEvent.change(getByRole('textbox'), { target: { value: inputValue } })
  expect(handleChange).toHaveBeenCalledTimes(1)
  expect(handleChange).toHaveBeenCalledWith(
    inputValue,
    expect.anything(),
    'input'
  )

  rerender(
    <BarSearch
      inputProps={{ canClear: true }}
      value={inputValue}
      onChange={handleChange}
    />
  )

  const clearButton = getByRole('button', { name: 'clearButton' })
  expect(clearButton).toBeInTheDocument()
  fireEvent.click(clearButton)

  expect(handleChange).toHaveBeenCalledTimes(2)
  expect(handleChange).toHaveBeenCalledWith('', expect.anything(), 'clear')
})
