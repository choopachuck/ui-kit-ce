import * as React from 'react'
import { fireEvent, render, waitFor } from '@testing-library/react'
import { Select } from '../src'
import { light } from '@v-uik/theme'
import userEvent from '@testing-library/user-event'
import { Button } from '@v-uik/button'

const options = [
  { value: '', label: 'Выберите значение' },
  { value: '1', label: 'Первое' },
  { value: '2', label: 'Второе' },
  { value: '3', label: 'Третье' },
]

it('render empty value correctly', () => {
  const { getByText } = render(<Select options={options} />)
  expect(getByText('Выберите значение')).toBeInTheDocument()
})

it('render initial value correctly', () => {
  const { getByText } = render(<Select options={options} value="3" />)
  expect(getByText('Третье')).toBeInTheDocument()
})

it('render list correctly', async () => {
  const { getByRole, findByText } = render(<Select options={options} />)
  const button = getByRole('combobox')
  fireEvent.click(button)
  expect(await findByText('Первое')).toBeInTheDocument()
})

it('set sm size correctly', async () => {
  const { getByRole, findAllByRole } = render(
    <Select size="sm" options={options} />
  )
  const button = getByRole('combobox')
  expect(getComputedStyle(button)['padding']).toBe('4px 16px')
  fireEvent.click(button)
  const listItems = await findAllByRole('option')
  expect(getComputedStyle(listItems[0])['minHeight']).toBe('32px')
})

it('set md size correctly', async () => {
  const { getByRole, findAllByRole } = render(<Select options={options} />)
  const button = getByRole('combobox')
  expect(getComputedStyle(button)['padding']).toBe('8px 16px')
  fireEvent.click(button)
  const listItems = await findAllByRole('option')
  expect(getComputedStyle(listItems[0])['minHeight']).toBe('40px')
})

it('set lg size correctly', async () => {
  const { getByRole, findAllByRole } = render(
    <Select size="lg" options={options} />
  )
  const button = getByRole('combobox')
  expect(getComputedStyle(button)['padding']).toBe('12px 16px')
  fireEvent.click(button)
  const listItems = await findAllByRole('option')
  expect(getComputedStyle(listItems[0])['minHeight']).toBe('48px')
})

it('handle value change correctly', async () => {
  const onChange = jest.fn()
  const { getByRole, findAllByRole } = render(
    <Select options={options} onChange={onChange} />
  )
  const button = getByRole('combobox')
  fireEvent.click(button)
  const listItems = await findAllByRole('option')
  expect(onChange).toBeCalledTimes(0)
  fireEvent.click(listItems[1])
  expect(onChange).toBeCalledTimes(1)
  expect(onChange).toBeCalledWith('1', expect.anything())
})

it('handle disabled state correctly', async () => {
  const { getByRole, queryByRole } = render(
    <Select disabled options={options} />
  )
  const button = getByRole('combobox')
  expect(button).toHaveAttribute('disabled')
  fireEvent.click(button)
  await waitFor(() => expect(queryByRole('listbox')).not.toBeInTheDocument())
})

it('should navigate through disabled options correctly', async () => {
  const options = [
    { value: '', label: 'Пустое' },
    { value: '1', label: 'Первое', disabled: true },
    { value: '2', label: 'Второе' },
    { value: '3', label: 'Третье', disabled: true },
    { value: '4', label: 'Четвертое', disabled: true },
    { value: '5', label: 'Пятое' },
  ]
  const { getByRole, findAllByRole } = render(
    <Select options={options} classes={{ optionActive: 'active' }} />
  )
  const button = getByRole('combobox')
  fireEvent.click(button)
  const listItems = await findAllByRole('option')
  expect(
    document.getElementsByClassName('active')[0] === listItems[0]
  ).toBeTruthy()
  fireEvent.keyDown(button, { key: 'ArrowDown' })
  expect(
    document.getElementsByClassName('active')[0] === listItems[2]
  ).toBeTruthy()
  fireEvent.keyDown(button, { key: 'ArrowDown' })
  expect(
    document.getElementsByClassName('active')[0] === listItems[5]
  ).toBeTruthy()
  fireEvent.keyDown(button, { key: 'ArrowUp' })
  expect(
    document.getElementsByClassName('active')[0] === listItems[2]
  ).toBeTruthy()
  fireEvent.keyDown(button, { key: 'ArrowUp' })
  expect(
    document.getElementsByClassName('active')[0] === listItems[0]
  ).toBeTruthy()
})

it('should leave option active if all next disabled', async () => {
  const options = [
    { value: '', label: 'Пустое' },
    { value: '1', label: 'Первое' },
    { value: '2', label: 'Второе', disabled: true },
    { value: '3', label: 'Третье', disabled: true },
  ]
  const { getByRole, findAllByRole } = render(
    <Select options={options} classes={{ optionActive: 'active' }} />
  )
  const button = getByRole('combobox')
  fireEvent.click(button)
  const listItems = await findAllByRole('option')
  fireEvent.keyDown(button, { key: 'ArrowDown' })
  expect(
    document.getElementsByClassName('active')[0] === listItems[1]
  ).toBeTruthy()
  fireEvent.keyDown(button, { key: 'ArrowDown' })
  expect(
    document.getElementsByClassName('active')[0] === listItems[1]
  ).toBeTruthy()
})

it('leave focus on a button when managing a list', async () => {
  const options = [
    { value: '', label: 'Пустое' },
    { value: '1', label: 'Первое' },
    { value: '2', label: 'Второе', disabled: true },
    { value: '3', label: 'Третье', disabled: true },
  ]
  const { getByRole, findAllByRole, findByRole } = render(
    <Select options={options} classes={{ optionActive: 'active' }} />
  )
  const button = getByRole('combobox')
  fireEvent.click(button)
  userEvent.tab()
  const list = await findByRole('listbox')
  const listItems = await findAllByRole('option')
  fireEvent.keyDown(button, { key: 'ArrowDown' })
  expect(
    document.getElementsByClassName('active')[0] === listItems[1]
  ).toBeTruthy()
  expect(button).toHaveFocus()
  expect(list).not.toHaveFocus()
})

it('handle value change correctly', async () => {
  const onChange = jest.fn()
  const { findAllByRole } = render(
    <Select multiple options={options} value={['', '1']} onChange={onChange} />
  )
  const listItems = await findAllByRole('option')
  fireEvent.click(listItems[2])
  expect(onChange).toBeCalledWith(['', '1', '2'], expect.anything())
})

it('unselected value', async () => {
  const onChange = jest.fn()

  const { findAllByRole } = render(
    <Select
      multiple
      options={options}
      value={['', '1', '2']}
      onChange={onChange}
    />
  )
  const listItems = await findAllByRole('option')
  fireEvent.click(listItems[1])
  expect(onChange).toBeCalledWith(['', '2'], expect.anything())
})

it('set label and helper text', () => {
  const text = 'This label'
  const helperText = 'Helper Text'

  const { getByText } = render(
    <Select
      multiple
      options={options}
      value={['', '1', '2']}
      label={text}
      helperText={helperText}
    />
  )

  expect(getByText(text)).toBeInTheDocument()
  expect(getByText(helperText)).toBeInTheDocument()
})

it('helper text in error state', () => {
  const helperText = 'Helper Text'

  const { getByText } = render(
    <Select
      multiple
      error
      options={options}
      value={['', '1', '2']}
      helperText={helperText}
    />
  )
  expect(getByText(helperText)).toHaveStyle(
    `color: ${light.comp.inputHelperText.colorTextError}`
  )
})

it('multiple disabled select should be disabled', async () => {
  const onChange = jest.fn()

  const classes = {
    disabled: 'disabled',
  }

  const { getByRole, findAllByRole } = render(
    <Select
      multiple
      disabled
      options={options}
      value={['', '1', '2']}
      //@ts-ignore
      classes={classes}
      onChange={onChange}
    />
  )

  const listItems = await findAllByRole('option')
  fireEvent.click(listItems[1])
  expect(onChange).not.toBeCalled()

  const listBox = getByRole('listbox')
  expect(listBox).toHaveClass('disabled')
})

it('multiple - not focused on hover', async () => {
  const { getByRole, findAllByRole } = render(
    <Select multiple options={options} />
  )

  const listItems = await findAllByRole('option')
  fireEvent.mouseEnter(listItems[1])
  const listBox = getByRole('listbox')

  expect(listBox.style.boxShadow).toBe('')
})

it('multiple - focused on click', async () => {
  const { getByRole, findAllByRole } = render(
    <Select multiple options={options} />
  )

  const listItems = await findAllByRole('option')
  fireEvent.focus(listItems[1])
  const listBox = getByRole('listbox')

  expect(listBox.style.boxShadow).not.toBe('')
})

it('multiple - focused and unfocused on tab', () => {
  const { getByRole } = render(
    <>
      <Button id="btn1">Button 1</Button>
      <Select multiple options={options} />
      <Button id="btn2">Button 2</Button>
    </>
  )

  const button1 = document.getElementById('btn1') as HTMLButtonElement

  const listBox = getByRole('listbox')

  expect(listBox.style.boxShadow).toBe('')

  userEvent.click(button1)
  userEvent.tab()

  expect(listBox.style.boxShadow).not.toBe('')

  userEvent.tab()

  expect(listBox.style.boxShadow).toBe('')

  userEvent.tab({ shift: true })

  expect(listBox.style.boxShadow).not.toBe('')

  userEvent.tab({ shift: true })

  expect(listBox.style.boxShadow).toBe('')
})

it('should render placeholder value', () => {
  const { getByText, queryByText, rerender } = render(
    <Select options={options} value="" placeholder="Placeholder" />
  )
  expect(getByText('Placeholder')).toBeInTheDocument()
  rerender(<Select options={options} value="1" placeholder="Placeholder" />)
  expect(queryByText('Placeholder')).not.toBeInTheDocument()
})
