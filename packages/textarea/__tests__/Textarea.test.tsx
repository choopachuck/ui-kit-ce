import * as React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Textarea } from '../src'

it('render label and helper text correctly', () => {
  const label = 'test label'
  const helperText = 'helper text'
  const { rerender, queryByText } = render(<Textarea />)
  expect(queryByText(label)).not.toBeInTheDocument()
  expect(queryByText(helperText)).not.toBeInTheDocument()
  rerender(<Textarea label={label} helperText={helperText} />)
  expect(queryByText(label)).toBeInTheDocument()
  expect(queryByText(helperText)).toBeInTheDocument()
})

it('set rows count correctly', () => {
  const { rerender, getByRole } = render(<Textarea />)
  expect(getByRole('textbox')).toHaveAttribute('rows', '3')
  rerender(<Textarea rows={7} />)
  expect(getByRole('textbox')).toHaveAttribute('rows', '7')
})

it('fill full width', () => {
  const testId = 'testId'
  const { rerender, getByTestId } = render(<Textarea data-testid={testId} />)
  let container = getByTestId(testId)
  expect(container).not.toHaveStyle('width: 100%')
  expect(container.firstElementChild).not.toHaveStyle('width: 100%')
  rerender(<Textarea fullWidth data-testid={testId} />)
  container = getByTestId(testId)
  expect(container).toHaveStyle('width: 100%')
  expect(container.firstElementChild).toHaveStyle('width: 100%')
})

it('render error state', () => {
  const testId = 'testId'
  const { rerender, getByTestId } = render(<Textarea data-testid={testId} />)
  const container = getByTestId(testId).firstElementChild as HTMLElement
  expect(container.className).not.toMatch(/error/i)
  rerender(<Textarea error data-testid={testId} />)
  expect(container.className).toMatch(/error/i)
})

it('render disabled state', () => {
  const testId = 'testId'
  const { rerender, getByTestId, getByRole } = render(
    <Textarea data-testid={testId} />
  )
  const container = getByTestId(testId).firstElementChild as HTMLElement
  const textarea = getByRole('textbox')
  expect(textarea).not.toHaveAttribute('disabled')
  expect(container.className).not.toMatch(/disabled/i)
  rerender(<Textarea disabled data-testid={testId} />)
  expect(textarea).toHaveAttribute('disabled')
  expect(container.className).toMatch(/disabled/i)
})

it('handle change correctly', () => {
  const onChange = jest.fn()
  const { getByRole } = render(<Textarea value="test" onChange={onChange} />)
  const textarea = getByRole('textbox')
  expect(textarea).toHaveValue('test')
  fireEvent.change(textarea, { target: { value: 'tested' } })
  expect(onChange).toBeCalledTimes(1)
  expect(onChange).toBeCalledWith('tested', expect.anything())
  fireEvent.change(textarea, { target: { value: '' } })
  expect(onChange).toBeCalledTimes(2)
  expect(onChange).toBeCalledWith('', expect.anything())
})

it('works with null value correctly', () => {
  const { getByRole } = render(<Textarea value={null} />)
  const textarea = getByRole('textbox')
  expect(textarea).toHaveValue('')
})
