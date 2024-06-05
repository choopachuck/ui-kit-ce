import * as React from 'react'
import { InputNumber } from '../src'
import { fireEvent, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const Editable = () => {
  const [value, setValue] = React.useState<number | undefined>(undefined)

  const handleChange = (val: number | null) => {
    setValue(val === null ? undefined : val)
  }

  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.key === 'ArrowDown') {
      handleChange(444)
    }
  }

  return (
    <>
      <button type="button" onClick={() => setValue(50)}>
        change
      </button>
      <InputNumber
        precision={3}
        groupSeparator=","
        decimalSeparator="."
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </>
  )
}

it('cursor following user', () => {
  const { getByRole } = render(<Editable />)
  const input = getByRole('textbox')
  expect(input).toHaveValue('')
  input.focus()
  userEvent.keyboard('1')
  expect(input).toHaveValue('1')
  userEvent.keyboard('2')
  expect(input).toHaveValue('12')
  userEvent.keyboard('3')
  expect(input).toHaveValue('123')
  userEvent.keyboard('4')
  expect(input).toHaveValue('1,234')

  input.blur()

  expect(input).toHaveValue('1,234.000')

  input.focus()

  expect(input).toHaveValue('1,234.000')
})

it('set initial value correctly', () => {
  const { getByRole } = render(<InputNumber value={7} />)

  expect(getByRole('textbox')).toHaveValue('7,00')
})

it('set number separator correctly', () => {
  const { getByRole, rerender, unmount } = render(
    <InputNumber value={7} decimalSeparator="." />
  )

  expect(getByRole('textbox')).toHaveValue('7.00')
  unmount()
  rerender(<InputNumber value={7} decimalSeparator="_" />)
  expect(getByRole('textbox')).toHaveValue('7_00')
})

it('set groupSeparator correctly', () => {
  const number = 1234.567
  const { getByRole, rerender, unmount } = render(
    <InputNumber
      value={number}
      groupSeparator=","
      decimalSeparator="."
      precision={3}
    />
  )

  expect(getByRole('textbox')).toHaveValue('1,234.567')
  unmount()
  rerender(
    <InputNumber
      value={number}
      groupSeparator="_"
      decimalSeparator="."
      precision={3}
    />
  )
  expect(getByRole('textbox')).toHaveValue('1_234.567')
})

it('handle change value correctly', () => {
  const onChange = jest.fn()
  const { getByRole } = render(
    <InputNumber
      precision={3}
      groupSeparator=","
      decimalSeparator="."
      onChange={onChange}
    />
  )
  const inputNumber = getByRole('textbox')

  fireEvent.change(inputNumber, { target: { value: 12345 } })
  expect(onChange).toBeCalledTimes(1)
  expect(onChange).toBeCalledWith(12345, expect.anything(), 'input')
  expect(inputNumber).toHaveValue('12,345')
})

it('handle big numbers', () => {
  const onChange = jest.fn()
  const { getByRole } = render(
    <InputNumber
      valueType="string"
      groupSeparator=","
      decimalSeparator="."
      precision={3}
      onChange={onChange}
    />
  )
  const inputNumber = getByRole('textbox')
  // Числа больше, чем Number.MAX_SAFE_INTEGER
  const bigNumberInputText = '900,719,925,474,099,112'
  const inputText = `${Number.MAX_SAFE_INTEGER}12`

  fireEvent.change(inputNumber, { target: { value: inputText } })
  expect(onChange).toBeCalledTimes(1)
  expect(onChange).toBeCalledWith(inputText, expect.anything(), 'input')
  expect(inputNumber).toHaveValue(bigNumberInputText)
})

it('handle initial value is zero', () => {
  const onChange = jest.fn()
  const { getByRole } = render(
    <InputNumber
      precision={2}
      groupSeparator=","
      decimalSeparator="."
      value={0}
      onChange={onChange}
    />
  )

  const inputNumber = getByRole('textbox')
  expect(inputNumber).toHaveValue('0.00')
})

it('handle change value to zero', () => {
  const onChange = jest.fn()
  const { getByRole } = render(
    <InputNumber
      precision={1}
      groupSeparator=","
      decimalSeparator="."
      value={0}
      onChange={onChange}
    />
  )

  const inputNumber = getByRole('textbox')
  fireEvent.change(inputNumber, { target: { value: '0.3' } })
  expect(onChange).toBeCalledTimes(1)
  expect(onChange).toBeCalledWith(0.3, expect.anything(), 'input')
})

it('set precision=0 correct', () => {
  const onChange = jest.fn()

  const { getByRole, rerender, unmount } = render(
    <InputNumber
      decimalSeparator="."
      precision={0}
      value={123.23}
      onChange={onChange}
    />
  )

  expect(getByRole('textbox')).toHaveValue('123')
  unmount()
  rerender(
    <InputNumber
      decimalSeparator=","
      precision={0}
      value="1234.23"
      onChange={onChange}
    />
  )
  expect(getByRole('textbox')).toHaveValue('1 234')
})

it('paste value with differ decimalSeparator', () => {
  const onChange = jest.fn()

  const { getByRole } = render(
    <InputNumber decimalSeparator="." onChange={onChange} />
  )

  const input = getByRole('textbox')

  const clipboardEvent: Event = new Event('paste', {
    bubbles: true,
    cancelable: true,
    composed: true,
  })

  // @ts-ignore
  clipboardEvent.clipboardData = {
    getData: () => '1234,56',
  }

  userEvent.paste(input, '1234,56', clipboardEvent)

  expect(input).toHaveValue('1 234.56')
})

it('handle clear value correctly', () => {
  const handleChange = jest.fn()
  const inputValue = 20
  const { getByRole, rerender } = render(
    <InputNumber canClear value={null} onChange={handleChange} />
  )
  fireEvent.change(getByRole('textbox'), { target: { value: inputValue } })
  expect(handleChange).toHaveBeenCalledTimes(1)
  expect(handleChange).toHaveBeenCalledWith(
    inputValue,
    expect.anything(),
    'input'
  )

  rerender(<InputNumber canClear value={inputValue} onChange={handleChange} />)

  const clearButton = getByRole('button', { name: 'clearButton' })
  expect(clearButton).toBeInTheDocument()
  fireEvent.mouseDown(clearButton)

  expect(handleChange).toHaveBeenCalledTimes(2)
  expect(handleChange).toHaveBeenCalledWith(null, expect.anything(), 'clear')
})

it('handles external change correctly', () => {
  const { getByRole } = render(<Editable />)
  const input = getByRole('textbox')
  expect(input).toHaveValue('')
  input.focus()
  userEvent.keyboard('1')
  expect(input).toHaveValue('1')
  input.blur()
  expect(input).toHaveValue('1.000')

  const button = getByRole('button')
  button.click()

  expect(input).toHaveValue('50.000')

  input.focus()

  expect(input).toHaveValue('50.000')

  input.blur()

  expect(input).toHaveValue('50.000')

  input.focus()
  // simulating external state change without blur
  fireEvent.keyDown(input, { key: 'ArrowDown' })
  expect(input).toHaveValue('444.000')
  expect(input).toHaveFocus()
})
