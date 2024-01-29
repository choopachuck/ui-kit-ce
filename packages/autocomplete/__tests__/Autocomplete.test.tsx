import * as React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { Autocomplete } from '../src'

it('should select correct value when using keyboard', () => {
  const onChange = jest.fn()
  const options = [
    { value: '', label: 'Пустое' },
    { value: '2', label: 'Второе' },
    { value: '3', label: 'Третье' },
    { value: '4', label: 'Четвертое' },
    { value: '5', label: 'Пятое' },
  ]
  const { getByRole } = render(
    <Autocomplete openOnFocus options={options} onChange={onChange} />
  )
  const comboboxInput = getByRole('combobox')

  const searchInput = getByRole('textbox') as HTMLInputElement
  fireEvent.change(searchInput, { target: { value: 'о' } })

  fireEvent.keyDown(comboboxInput, { key: 'ArrowDown' })
  expect(searchInput.value === 'Пустое').toBeTruthy()

  fireEvent.keyDown(comboboxInput, { key: 'ArrowDown' })
  expect(searchInput.value === 'Второе').toBeTruthy()

  fireEvent.keyDown(comboboxInput, { key: 'ArrowDown' })
  expect(searchInput.value === 'Четвертое').toBeTruthy()

  fireEvent.keyDown(comboboxInput, { key: 'ArrowUp' })
  expect(searchInput.value === 'Второе').toBeTruthy()

  expect(onChange).toBeCalledTimes(5)
  expect(onChange).lastCalledWith('Второе', expect.anything(), 'select-arrows')
})

it('dropdown not opening when option not found', async () => {
  const options = [
    { value: '', label: 'Пустое' },
    { value: '2', label: 'Второе' },
    { value: '3', label: 'Третье' },
    { value: '4', label: 'Четвертое' },
    { value: '5', label: 'Пятое' },
  ]
  const { getByRole, queryByRole } = render(<Autocomplete options={options} />)

  const searchInput = getByRole('textbox')
  fireEvent.change(searchInput, { target: { value: '32131' } })

  await waitFor(() => expect(queryByRole('list')).not.toBeInTheDocument())
})

it('has focus when click on label STS-30123', () => {
  const { getByText, getByRole } = render(
    <Autocomplete
      label="label"
      labelProps={{
        htmlFor: 'basic-autocomplete',
      }}
      controlInnerProps={{
        id: 'basic-autocomplete',
      }}
      options={[]}
    />
  )

  const label = getByText('label')

  fireEvent.click(label)

  const searchInput = getByRole('textbox')

  expect(searchInput).toHaveFocus()
})

it('outside value change clears inputs text STS-30122', async () => {
  const { rerender, container } = render(<Autocomplete value="Google" />)

  rerender(<Autocomplete value="" />)

  await waitFor(() =>
    expect(
      container.querySelector('[class^="singleValue"]')
    ).not.toBeInTheDocument()
  )
})
