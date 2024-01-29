import * as React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { BarSelect } from '../src'

const options = [
  { value: '', label: 'Выберите значение' },
  { value: '1', label: 'Первое' },
  { value: '2', label: 'Второе' },
  { value: '3', label: 'Третье' },
]

it('render initial value correctly', () => {
  const { getByText } = render(<BarSelect options={options} value="3" />)
  expect(getByText('Третье')).toBeInTheDocument()
})

it('render list correctly', async () => {
  const { getByRole, findByText } = render(<BarSelect options={options} />)
  fireEvent.click(getByRole('combobox'))
  expect(await findByText('Первое')).toBeInTheDocument()
})

it('handle value change correctly', async () => {
  const onChange = jest.fn()
  const { getByRole, findAllByRole } = render(
    <BarSelect options={options} onChange={onChange} />
  )
  fireEvent.click(getByRole('combobox'))
  const listItems = await findAllByRole('option')
  expect(onChange).toBeCalledTimes(0)
  fireEvent.click(listItems[1])
  expect(onChange).toBeCalledTimes(1)
  expect(onChange).toBeCalledWith('1', expect.anything())
})
