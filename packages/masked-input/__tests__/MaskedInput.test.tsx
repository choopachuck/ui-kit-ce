import * as React from 'react'
import { MaskedInput } from '../src'
import { fireEvent, render } from '@testing-library/react'

const MASK = '+7 (111) 111-11-11'

const EditableComp = () => {
  const [value, setValue] = React.useState('')

  return (
    <MaskedInput
      mask="********-****-****-****-************"
      value={value}
      onChange={setValue}
    />
  )
}

const EditableNumberComp = () => {
  const [value, setValue] = React.useState('')

  return <MaskedInput mask="11-11" value={value} onChange={setValue} />
}

it('set input value correctly', () => {
  const { getByRole } = render(<MaskedInput mask={MASK} value="9218754539" />)
  expect(getByRole('textbox')).toHaveValue('+7 (921) 875-45-39')
})

it('v is not insterted when ctrl+v', () => {
  const { getByRole } = render(<EditableComp />)
  const input = getByRole('textbox')
  input.dispatchEvent(
    new KeyboardEvent('keydown', {
      key: 'v',
      ctrlKey: true,
      metaKey: true,
      bubbles: true,
    })
  )

  expect(input).toHaveValue('')
})

it('set label correctly', () => {
  const { getByText } = render(<MaskedInput mask={MASK} label="MaskedInput" />)

  expect(getByText('MaskedInput')).toBeInTheDocument()
})

it('set helper text correctly', () => {
  const { getByText } = render(
    <MaskedInput
      mask={MASK}
      label="MaskedInput"
      helperText="HelperMaskedInput"
    />
  )

  expect(getByText('HelperMaskedInput')).toBeInTheDocument()
})

it('set fullWidth correctly', () => {
  const { getByRole } = render(<MaskedInput fullWidth mask={MASK} />)

  expect(getByRole('textbox')).toHaveStyle('width: 100%')
})

it('set invalid mask char in start', () => {
  const { getByRole } = render(<EditableNumberComp />)
  const input = getByRole('textbox')

  fireEvent.keyDown(input, { key: 'v' })

  expect(input).toHaveValue('')
})

it('set invalid mask char after first symbol', () => {
  const { getByRole } = render(<EditableNumberComp />)
  const input = getByRole('textbox')

  fireEvent.keyDown(input, { key: '7' })
  fireEvent.keyDown(input, { key: 'v' })

  expect(input).toHaveValue('7_-__')
})

it('handle clear value correctly', () => {
  const handleChange = jest.fn()
  const inputValue = '7'
  const { getByRole, rerender } = render(
    <MaskedInput canClear mask="**********" value="" onChange={handleChange} />
  )
  fireEvent.keyDown(getByRole('textbox'), { key: '7' })
  expect(handleChange).toHaveBeenCalledTimes(1)
  expect(handleChange).toHaveBeenCalledWith(
    inputValue,
    expect.anything(),
    'input'
  )

  rerender(
    <MaskedInput
      canClear
      mask="**********"
      value={inputValue}
      onChange={handleChange}
    />
  )

  const clearButton = getByRole('button', { name: 'clearButton' })
  expect(clearButton).toBeInTheDocument()
  fireEvent.mouseDown(clearButton)

  expect(handleChange).toHaveBeenCalledTimes(2)
  expect(handleChange).toHaveBeenCalledWith('', expect.anything(), 'clear')
})
