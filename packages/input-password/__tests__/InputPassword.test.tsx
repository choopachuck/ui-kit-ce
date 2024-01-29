import * as React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { InputPassword } from '../src'

it(' can work as an input', () => {
  const onChange = jest.fn()
  const { getByDisplayValue } = render(
    <InputPassword value="text" onChange={onChange} />
  )
  expect(onChange).toHaveBeenCalledTimes(0)
  fireEvent.change(getByDisplayValue('text'), {
    target: { value: 'new value' },
  })
  expect(onChange).toHaveBeenCalledTimes(1)
  expect(onChange).toHaveBeenCalledWith('new value', expect.anything(), 'input')
})

it(' has the option of moving the icon to the left', () => {
  const { rerender, container } = render(<InputPassword />)
  expect(container).toMatchSnapshot()
  rerender(<InputPassword iconPosition="start" />)
  expect(container).toMatchSnapshot()
})

it(' could take text as an icon', () => {
  const { queryByText, getByText } = render(
    <InputPassword hideIcon="111" showIcon="222" />
  )
  expect(queryByText('111')).toBeInTheDocument()
  expect(queryByText('222')).not.toBeInTheDocument()

  fireEvent.click(getByText('111'))
  expect(queryByText('111')).not.toBeInTheDocument()
  expect(queryByText('222')).toBeInTheDocument()
})

it('could take component as an icon', () => {
  const hideIcon = <span>hideIcon</span>
  const showIcon = <span>showIcon</span>
  const { queryByText, getByText } = render(
    <InputPassword hideIcon={hideIcon} showIcon={showIcon} />
  )
  expect(queryByText('hideIcon')).toBeInTheDocument()
  expect(queryByText('showIcon')).not.toBeInTheDocument()

  fireEvent.click(getByText('hideIcon'))
  expect(queryByText('hideIcon')).not.toBeInTheDocument()
  expect(queryByText('showIcon')).toBeInTheDocument()
})

it('handle clear value correctly', () => {
  const handleChange = jest.fn()
  const inputValue = 'new value'
  const { getByRole, rerender, container } = render(
    <InputPassword canClear value="" onChange={handleChange} />
  )
  fireEvent.change(
    container.querySelector('input[type="password"]') as Element,
    { target: { value: inputValue } }
  )
  expect(handleChange).toHaveBeenCalledTimes(1)
  expect(handleChange).toHaveBeenCalledWith(
    inputValue,
    expect.anything(),
    'input'
  )

  rerender(
    <InputPassword canClear value={inputValue} onChange={handleChange} />
  )

  const clearButton = getByRole('button', { name: 'clearButton' })
  expect(clearButton).toBeInTheDocument()
  fireEvent.mouseDown(clearButton)

  expect(handleChange).toHaveBeenCalledTimes(2)
  expect(handleChange).toHaveBeenCalledWith('', expect.anything(), 'clear')
})
