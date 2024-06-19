import * as React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { InputBase, InputBaseProps } from '../src'
import { createUseStyles, light } from '@v-uik/theme'

const useStyles = createUseStyles((theme) => ({
  customFocus: {
    borderColor: theme.sys.color.errorAlpha,
  },
}))

const Component = (props: Partial<InputBaseProps>) => {
  const classesList = useStyles()

  return (
    <InputBase
      {...props}
      classes={{
        focused: classesList.customFocus,
      }}
      data-testid="testId"
    />
  )
}

it('set input value correctly', () => {
  const { getByRole } = render(<InputBase value="text" />)
  expect(getByRole('textbox')).toHaveValue('text')
})

it('handle changing value correctly', () => {
  const onChange = jest.fn()
  const { getByRole } = render(<InputBase value="text" onChange={onChange} />)
  expect(onChange).toHaveBeenCalledTimes(0)
  fireEvent.change(getByRole('textbox'), { target: { value: 'new value' } })
  expect(onChange).toHaveBeenCalledTimes(1)
  expect(onChange).toHaveBeenCalledWith('new value', expect.anything(), 'input')
})

it('render prefix', () => {
  const { getByText } = render(<InputBase prefix="prefix" />)
  expect(getByText('prefix')).toBeInTheDocument()
})

it('render suffix', () => {
  const { getByText } = render(<InputBase suffix="suffix" />)
  expect(getByText('suffix')).toBeInTheDocument()
})

it('render error icon if property enabled', () => {
  const { rerender } = render(<InputBase showErrorIcon={false} />)
  expect(document.querySelector('svg')).not.toBeInTheDocument()
  rerender(<InputBase error showErrorIcon={false} />)
  expect(document.querySelector('svg')).not.toBeInTheDocument()
  rerender(<InputBase error showErrorIcon />)
  expect(document.querySelector('svg')).toBeInTheDocument()
})

it('focus input when clicking container', () => {
  const { getByTestId, getByRole } = render(<InputBase data-testid="testId" />)
  fireEvent.click(getByTestId('testId'))
  expect(document.activeElement).toBe(getByRole('textbox'))
})

it('handle focus/blur correctly', () => {
  const onFocusChange = jest.fn()
  const { getByRole } = render(<InputBase onFocusChange={onFocusChange} />)
  expect(onFocusChange).toHaveBeenCalledTimes(0)
  fireEvent.focus(getByRole('textbox'))
  expect(onFocusChange).toHaveBeenCalledTimes(1)
  expect(onFocusChange).toHaveBeenCalledWith(true)
  fireEvent.blur(getByRole('textbox'))
  expect(onFocusChange).toHaveBeenCalledTimes(2)
  expect(onFocusChange).toHaveBeenCalledWith(false)
})

it('stretch to full width', () => {
  const { getByTestId } = render(<InputBase fullWidth data-testid="testId" />)
  expect(getByTestId('testId')).toHaveStyle('width: 100%')
})

it('overriding focus styles', async () => {
  const { getByTestId } = render(<Component data-testid="testId" />)
  const element = getByTestId('testId')

  fireEvent.click(element)

  await waitFor(() =>
    expect(element).toHaveStyle(`borderColor: ${light.sys.color.errorAlpha}`)
  )
})

describe('handle clear value correctly', () => {
  it('by mouse down', () => {
    const handleChange = jest.fn()
    const inputValue = 'new value'
    const { getByRole, rerender } = render(
      <InputBase canClear value="" onChange={handleChange} />
    )
    fireEvent.change(getByRole('textbox'), { target: { value: inputValue } })
    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(handleChange).toHaveBeenCalledWith(
      inputValue,
      expect.anything(),
      'input'
    )

    rerender(<InputBase canClear value={inputValue} onChange={handleChange} />)

    const clearButton = getByRole('button', { name: 'clearButton' })
    expect(clearButton).toBeInTheDocument()
    fireEvent.click(clearButton)

    expect(handleChange).toHaveBeenCalledTimes(2)
    expect(handleChange).toHaveBeenCalledWith('', expect.anything(), 'clear')
  })
})
