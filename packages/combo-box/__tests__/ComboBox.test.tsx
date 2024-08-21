import * as React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { ComboBox } from '../src'
import userEvent from '@testing-library/user-event'

const options = [
  { value: '0', label: 'Нулевое', type: 'some' },
  { value: '1', label: 'Первое', type: 'other' },
  { value: '2', label: 'Второе', type: 'some' },
  { value: '3', label: 'Третье', type: 'other' },
]

it('render component with correctly default placeholder', () => {
  const { getByText, rerender } = render(
    <ComboBox multiple id="combobox" options={options} />
  )

  expect(document.querySelector('#combobox')).toBeInTheDocument()
  expect(getByText('Выберите опцию'))

  rerender(<ComboBox isSearchable options={options} />)
  expect(getByText('Поиск'))
})

it('set placeholder correctly', () => {
  const { getByText, rerender } = render(
    <ComboBox
      isSearchable
      placeholder="Отображается в плейсхолдере инпута"
      options={options}
    />
  )

  expect(getByText('Отображается в плейсхолдере инпута')).toBeInTheDocument()

  rerender(<ComboBox placeholder="Плейсхолдер в контенте" options={options} />)
  expect(getByText('Плейсхолдер в контенте'))

  rerender(
    <ComboBox
      multiple
      placeholder="Плейсхолдер в контенте мультивыбор"
      options={options}
    />
  )
  expect(getByText('Плейсхолдер в контенте мультивыбор'))

  rerender(
    <ComboBox
      isSearchable
      multiple
      placeholder="Отображается в плейсхолдере инпута мультивыбор"
      options={options}
    />
  )
  expect(getByText('Отображается в плейсхолдере инпута мультивыбор'))
})

it('option is selected when value is empty', () => {
  const optionsWithEmptyValue = [
    { value: '', label: 'EMPTY VALUE' },
    ...options,
  ]

  const { getByText } = render(
    <ComboBox
      multiple
      value={[optionsWithEmptyValue[0]]}
      options={optionsWithEmptyValue}
    />
  )

  expect(getByText('EMPTY VALUE')).toBeInTheDocument()
})

it('render initial value correctly in single mode', () => {
  const { getByText } = render(
    <ComboBox value={options[2]} options={options} />
  )

  expect(getByText('Второе')).toBeInTheDocument()
})

it('render initial value correctly in multiple mode', () => {
  const { getByText } = render(
    <ComboBox multiple value={[options[0], options[2]]} options={options} />
  )

  expect(getByText('Нулевое, Второе')).toBeInTheDocument()
})

it('the selected value is overridden by the search', async () => {
  const { getByRole, queryByText } = render(
    <ComboBox isSearchable value={options[2]} options={options} />
  )

  const input = getByRole('textbox')

  // при вводе значения в одиночном режиме, оно перекрывает старое значение
  fireEvent.change(input, { target: { value: 'Пер' } })

  await waitFor(() => {
    expect(input).toHaveValue('Пер')
    expect(queryByText('Второе')).not.toBeInTheDocument()
  })
})

it('render correctly value with tags', () => {
  const { getByRole } = render(
    <ComboBox multiple withTags value={[options[2]]} options={options} />
  )

  expect(getByRole('button', { name: 'Второе' })).toBeInTheDocument()
})

it('render correctly value with limit tags correctly', () => {
  const props = {
    withTags: true,
    value: [options[1], options[2], options[3]],
    options,
  }

  const { getByRole, rerender } = render(
    <ComboBox multiple limitTags={1} {...props} />
  )

  expect(getByRole('button', { name: 'Первое' })).toBeInTheDocument()
  expect(getByRole('button', { name: '+2' })).toBeInTheDocument()

  rerender(<ComboBox multiple limitTags={2} {...props} />)

  expect(getByRole('button', { name: 'Первое' })).toBeInTheDocument()
  expect(getByRole('button', { name: 'Второе' })).toBeInTheDocument()
  expect(getByRole('button', { name: '+1' })).toBeInTheDocument()

  rerender(<ComboBox multiple limitTags={0} {...props} />)
  expect(getByRole('button', { name: '3' })).toBeInTheDocument()
})

it('without value clear button not render', () => {
  const { queryByRole } = render(<ComboBox canClear options={options} />)

  expect(queryByRole('button', { name: 'clearButton' })).not.toBeInTheDocument()
})

it('with value clear button render correctly', () => {
  const { getByRole } = render(
    <ComboBox canClear value={options[2]} options={options} />
  )

  expect(getByRole('button', { name: 'clearButton' })).toBeInTheDocument()
})

it('render list correctly', async () => {
  const { getByRole, findByText } = render(<ComboBox options={options} />)
  fireEvent.mouseDown(getByRole('button', { name: 'openPopupButton' }))
  expect(await findByText('Первое')).toBeInTheDocument()
})

it('handle change value correctly', async () => {
  const onChange = jest.fn()

  const { getByRole, findAllByRole } = render(
    <ComboBox options={options} onChange={onChange} />
  )

  const openButton = getByRole('button', { name: 'openPopupButton' })
  fireEvent.mouseDown(openButton)
  const foundOptions = await findAllByRole('option')
  fireEvent.click(foundOptions[2])
  expect(onChange).toBeCalledTimes(1)
  expect(onChange).toBeCalledWith(
    '2',
    expect.anything(),
    {
      value: '2',
      label: 'Второе',
      type: 'some',
    },
    'select'
  )
})

it('handle value change correctly in multiple mode', async () => {
  const onChange = jest.fn()
  const { findAllByRole, getByRole } = render(
    <ComboBox
      multiple
      options={options}
      value={[options[0], options[1]]}
      onChange={onChange}
    />
  )
  const openButton = getByRole('button', { name: 'openPopupButton' })
  fireEvent.mouseDown(openButton)

  const foundOptions = await findAllByRole('option')
  fireEvent.click(foundOptions[2])
  expect(onChange).toBeCalledTimes(1)
  expect(onChange).toBeCalledWith(
    ['0', '1', '2'],
    expect.anything(),
    [
      { value: '0', label: 'Нулевое', type: 'some' },
      { value: '1', label: 'Первое', type: 'other' },
      { value: '2', label: 'Второе', type: 'some' },
    ],
    'select'
  )
})

it('unselect selected option correctly in multiple mode', async () => {
  const onChange = jest.fn()
  const { findAllByRole, getByRole } = render(
    <ComboBox
      multiple
      options={options}
      value={[options[1], options[3]]}
      onChange={onChange}
    />
  )

  const openButton = getByRole('button', { name: 'openPopupButton' })
  fireEvent.mouseDown(openButton)

  const foundOptions = await findAllByRole('option')
  fireEvent.click(foundOptions[3])
  expect(onChange).toBeCalledTimes(1)
  expect(onChange).toBeCalledWith(
    ['1'],
    expect.anything(),
    [
      {
        label: 'Первое',
        type: 'other',
        value: '1',
      },
    ],
    'select'
  )
})

it('handle disabled state correctly', async () => {
  const { getByRole, queryByRole } = render(
    <ComboBox disabled options={options} />
  )
  const openButton = getByRole('button', { name: 'openPopupButton' })
  expect(openButton).toHaveAttribute('aria-disabled', 'true')
  fireEvent.click(openButton)
  await waitFor(() => expect(queryByRole('list')).not.toBeInTheDocument())
})

it('open on focus with value openOnFocus correctly', async () => {
  const { findAllByRole } = render(<ComboBox openOnFocus options={options} />)

  userEvent.tab()

  const foundOptions = await findAllByRole('option')
  expect(foundOptions.length).toBe(4)
})

it('open on click with value openOnClick correctly', async () => {
  const { getByRole, findAllByRole } = render(<ComboBox options={options} />)

  const selectContainer = getByRole('combobox')

  userEvent.click(selectContainer)

  const foundOptions = await findAllByRole('option')
  expect(foundOptions.length).toBe(4)
})

it('render list with groupBy correctly', () => {
  const options = [
    { value: '0', label: 'Нулевое', type: 'some' },
    { value: '1', label: 'Первое', type: 'other' },
    { value: '2', label: 'Второе', type: 'some' },
    { value: '3', label: 'Третье', type: 'other' },
  ]

  const { getByText, getByRole } = render(
    <ComboBox
      options={options.sort((a, b) => -b.label.localeCompare(a.label))}
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      groupBy={(option) => option.type}
    />
  )

  const openButton = getByRole('button', { name: 'openPopupButton' })
  fireEvent.mouseDown(openButton)
  expect(getByText('some')).toBeInTheDocument()
  expect(getByText('other')).toBeInTheDocument()
})

it('handle opens list when searching', async () => {
  const { getByRole, queryByRole } = render(
    <ComboBox isSearchable options={options} />
  )

  const searchInput = getByRole('textbox')
  fireEvent.change(searchInput, { target: { value: 'Пер' } })
  await waitFor(() => expect(queryByRole('list')).toBeInTheDocument())
})

it('handle search value correctly', async () => {
  const { getByRole, findAllByRole, queryByText } = render(
    <ComboBox isSearchable options={options} />
  )

  const searchInput = getByRole('textbox')
  fireEvent.change(searchInput, { target: { value: 'Пер' } })
  const foundOptions = await findAllByRole('option')
  expect(foundOptions.length).toBe(1)
  expect(queryByText('Первое')).toBeInTheDocument()
  expect(queryByText('Второе')).not.toBeInTheDocument()
})

it('print no options text when option not found', async () => {
  const { getByRole, findAllByRole, queryByText } = render(
    <ComboBox
      isSearchable
      noOptionsText="Элемент не найден"
      options={options}
    />
  )

  const searchInput = getByRole('textbox')
  fireEvent.change(searchInput, { target: { value: '32131' } })
  const foundOptions = await findAllByRole('option')
  expect(foundOptions.length).toBe(1)
  expect(queryByText('Элемент не найден')).toBeInTheDocument()
})

it('handle change value with disableCloseOnSelect', async () => {
  const { getByRole, findAllByRole, queryByText } = render(
    <ComboBox
      multiple
      disableCloseOnSelect
      options={options}
      value={[options[0]]}
    />
  )

  const openButton = getByRole('button', { name: 'openPopupButton' })
  fireEvent.mouseDown(openButton)

  const foundOptions = await findAllByRole('option')
  fireEvent.click(foundOptions[1])
  fireEvent.click(foundOptions[2])

  expect(queryByText('Нулевое, Первое, Второе'))

  fireEvent.click(foundOptions[0])
  expect(queryByText('Первое, Второе'))
})

it('handle delete last selected value from keyboard', () => {
  const onChange = jest.fn()

  const { getByRole } = render(
    <ComboBox
      multiple
      withTags
      options={options}
      value={[options[0], options[1]]}
      onChange={onChange}
    />
  )
  const comboboxInput = getByRole('combobox')
  const value = Array.from(comboboxInput.childNodes[0].childNodes)
  expect(value.length).toBe(2)

  fireEvent.keyDown(comboboxInput, { key: 'Backspace' })
  expect(onChange).toBeCalledTimes(1)
  expect(onChange).toBeCalledWith(
    ['0'],
    expect.anything(),
    [options[0]],
    'delete'
  )
})

it('print suffix correctly at selected option', () => {
  const suffixOptions = [
    { value: '0', label: 'Нулевое', type: 'some' },
    { value: '1', label: 'Первое', type: 'other', suffix: 'hello' },
  ]

  const { queryByText, getByRole } = render(
    <ComboBox options={suffixOptions} value={options[1]} />
  )

  const openButton = getByRole('button', { name: 'openPopupButton' })
  fireEvent.mouseDown(openButton)

  const text = queryByText('hello')

  expect(text).toBeInTheDocument()
})

it('prefix should not exists', () => {
  const suffixOptions = [
    { value: '0', label: 'Нулевое', type: 'some', prefix: 'hello' },
    { value: '1', label: 'Первое', type: 'other' },
  ]

  const { queryByText, getByRole } = render(
    <ComboBox
      options={suffixOptions}
      value={options[0]}
      components={{ OptionPrefix: null }}
    />
  )

  const openButton = getByRole('button', { name: 'openPopupButton' })
  fireEvent.mouseDown(openButton)

  const text = queryByText('hello')

  expect(text).not.toBeInTheDocument()
})

it('suffix should not exists', () => {
  const suffixOptions = [
    { value: '0', label: 'Нулевое', type: 'some', suffix: 'hello' },
    { value: '1', label: 'Первое', type: 'other' },
  ]

  const { queryByText, getByRole } = render(
    <ComboBox
      options={suffixOptions}
      value={options[0]}
      components={{ OptionSuffix: null }}
    />
  )

  const openButton = getByRole('button', { name: 'openPopupButton' })
  fireEvent.mouseDown(openButton)

  const text = queryByText('hello')

  expect(text).not.toBeInTheDocument()
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
  const { findAllByRole, getByRole } = render(
    <ComboBox
      openOnFocus
      options={options}
      classes={{ optionActive: 'active' }}
    />
  )
  const comboboxInput = getByRole('combobox')

  userEvent.tab()

  const foundOptions = await findAllByRole('option')
  expect(
    document.getElementsByClassName('active')[0] === undefined
  ).toBeTruthy()
  fireEvent.keyDown(comboboxInput, { key: 'ArrowDown' })
  expect(
    document.getElementsByClassName('active')[0] === foundOptions[0]
  ).toBeTruthy()
  fireEvent.keyDown(comboboxInput, { key: 'ArrowDown' })
  expect(
    document.getElementsByClassName('active')[0] === foundOptions[2]
  ).toBeTruthy()
  fireEvent.keyDown(comboboxInput, { key: 'ArrowUp' })
  expect(
    document.getElementsByClassName('active')[0] === foundOptions[0]
  ).toBeTruthy()
  fireEvent.keyDown(comboboxInput, { key: 'ArrowUp' })
  expect(
    document.getElementsByClassName('active')[0] === foundOptions[0]
  ).toBeTruthy()
})

it('should leave option active if all next disabled', async () => {
  const options = [
    { value: '', label: 'Пустое' },
    { value: '1', label: 'Первое', disabled: true },
    { value: '2', label: 'Второе', disabled: true },
    { value: '3', label: 'Третье', disabled: true },
    { value: '4', label: 'Четвертое' },
  ]
  const { findAllByRole, getByRole } = render(
    <ComboBox options={options} classes={{ optionActive: 'active' }} />
  )
  const comboboxInput = getByRole('combobox')

  const openButton = getByRole('button', { name: 'openPopupButton' })
  fireEvent.mouseDown(openButton)
  const foundOptions = await findAllByRole('option')
  fireEvent.keyDown(comboboxInput, { key: 'ArrowDown' })
  expect(
    document.getElementsByClassName('active')[0] === foundOptions[0]
  ).toBeTruthy()
  fireEvent.keyDown(comboboxInput, { key: 'ArrowDown' })
  expect(
    document.getElementsByClassName('active')[0] === foundOptions[4]
  ).toBeTruthy()
})

it('first active element should be active after arrow press', async () => {
  const { getByRole, findAllByRole } = render(
    <ComboBox
      isSearchable
      classes={{ optionActive: 'active' }}
      options={options}
    />
  )
  const comboboxInput = getByRole('combobox')

  const searchInput = getByRole('textbox')
  fireEvent.change(searchInput, { target: { value: 'т' } })

  const foundOptions = await findAllByRole('option')
  expect(foundOptions.length).toBe(2)
  expect(
    document.getElementsByClassName('active')[0] === undefined
  ).toBeTruthy()

  fireEvent.keyDown(comboboxInput, { key: 'ArrowDown' })
  expect(
    document.getElementsByClassName('active')[0] === foundOptions[0]
  ).toBeTruthy()
})

it('handle focus correctly when using keyboard "Tab"', () => {
  // при нажатии Tab фокус попадает на комбобокс и уходит при следующем нажатии
  const { getByRole, rerender } = render(<ComboBox options={options} />)
  const combobox = getByRole('combobox')

  userEvent.tab()
  expect(combobox).toHaveFocus()

  userEvent.tab()
  expect(combobox).not.toHaveFocus()

  userEvent.tab({ shift: true })
  expect(combobox).toHaveFocus()

  userEvent.tab({ shift: true })
  expect(combobox).not.toHaveFocus()

  // при нажатии Tab фокус попадает на инпут комбобокса и уходит при следующем нажатии; фокус комбобокса игнорируется
  rerender(<ComboBox isSearchable options={options} />)
  const input = getByRole('textbox')
  userEvent.tab()
  expect(input).toHaveFocus()

  userEvent.tab()
  expect(input).not.toHaveFocus()
  expect(combobox).not.toHaveFocus()

  userEvent.tab({ shift: true })
  expect(input).toHaveFocus()

  userEvent.tab({ shift: true })
  expect(input).not.toHaveFocus()
  expect(combobox).not.toHaveFocus()
})

describe('handle change on empty value when delete', () => {
  it.each([true, false, undefined])('with canClear=%s', async (canClear) => {
    const onChange = jest.fn()

    const { getByRole, findAllByRole } = render(
      <ComboBox
        canClear={canClear}
        options={[
          { value: '0', label: 'Нулевое', type: 'some' },
          { value: '1', label: 'Первое', type: 'other' },
          { value: '2', label: 'Второе', type: 'some' },
          { value: '3', label: 'Третье', type: 'other' },
        ]}
        onChange={onChange}
      />
    )

    const openButton = getByRole('button', { name: 'openPopupButton' })
    fireEvent.mouseDown(openButton)
    let foundOptions = await findAllByRole('option')
    fireEvent.click(foundOptions[2])
    expect(onChange).toBeCalledTimes(1)
    expect(onChange).toBeCalledWith(
      '2',
      expect.anything(),
      {
        value: '2',
        label: 'Второе',
        type: 'some',
      },
      'select'
    )

    fireEvent.mouseDown(openButton)
    foundOptions = await findAllByRole('option')
    fireEvent.click(foundOptions[2])
    expect(onChange).toBeCalledTimes(canClear ? 2 : 1)
    if (canClear) {
      expect(onChange).toBeCalledWith(
        '',
        expect.anything(),
        undefined,
        'select'
      )
    }
  })
})

it('correctly selected value when options array changes', async () => {
  const { getByRole, findAllByRole } = render(
    <ComboBox
      options={[
        { value: '0', label: 'Нулевое' },
        { value: '1', label: 'Первое' },
        { value: '2', label: 'Второе' },
        { value: '3', label: 'Третье' },
      ]}
      value={{ label: 'Нулевое', value: '0' }}
    />
  )

  const openButton = getByRole('button', { name: 'openPopupButton' })
  fireEvent.mouseDown(openButton)
  const foundOptions = await findAllByRole('option')
  expect(foundOptions[0]).toHaveAttribute('aria-selected', 'true')
})

it('selected active should correct work when using keyboard', () => {
  const onChange = jest.fn()

  const { getByRole } = render(
    <ComboBox
      multiple
      withTags
      classes={{ focused: 'focused' }}
      options={options}
      value={[options[0], options[1]]}
      onChange={onChange}
    />
  )

  const combobox = getByRole('combobox')
  const value = combobox.childNodes[0]
  const selectedValues = value.childNodes

  expect(selectedValues.length).toBe(2)

  fireEvent.keyDown(combobox, { key: 'ArrowLeft' })
  expect(selectedValues[1]).toHaveClass('focused')

  fireEvent.keyDown(combobox, { key: 'ArrowLeft' })
  expect(selectedValues[0]).toHaveClass('focused')

  fireEvent.keyDown(combobox, { key: 'ArrowRight' })
  expect(selectedValues[1]).toHaveClass('focused')

  fireEvent.keyDown(combobox, { key: 'Backspace' })
  expect(onChange).toBeCalledTimes(1)
  expect(onChange).toBeCalledWith(
    ['0'],
    expect.anything(),
    [options[0]],
    'delete'
  )
})

it('should select correct selected active when using left/right arrows with input', () => {
  const { getByRole } = render(
    <ComboBox
      isSearchable
      multiple
      withTags
      classes={{ focused: 'focused' }}
      options={options}
      value={[options[0], options[1]]}
    />
  )

  const combobox = getByRole('combobox')
  const value = combobox.childNodes[0]
  const selectedValues = Array.from(value.childNodes).slice(0, -1)
  const input = getByRole('textbox')

  expect(selectedValues.length).toBe(2)

  fireEvent.keyDown(combobox, { key: 'ArrowLeft' })
  expect(selectedValues[1]).toHaveClass('focused')

  fireEvent.keyDown(combobox, { key: 'ArrowRight' })
  expect(input).toHaveFocus()
})

it('should remove selectValue after inputValue in correct order by clear indicator', () => {
  const onChange = jest.fn()

  const { getByRole } = render(
    <ComboBox
      canClear
      isSearchable
      multiple
      withTags
      options={options}
      value={[options[0], options[1]]}
      onChange={onChange}
    />
  )

  const clearButton = getByRole('button', { name: 'clearButton' })
  const input = getByRole('textbox')
  const combobox = getByRole('combobox')
  const value = combobox.childNodes[0]
  const selectedValues = Array.from(value.childNodes).slice(0, -1)

  fireEvent.change(input, { target: { value: 'dsad' } })

  expect(input).toHaveValue('dsad')
  fireEvent.click(clearButton)
  expect(input).toHaveValue('')
  expect(selectedValues.length).toBe(2)

  fireEvent.click(clearButton)
  expect(input).toHaveValue('')
  expect(onChange).toBeCalledTimes(1)
  expect(onChange).toBeCalledWith([], expect.anything(), undefined, 'clear')
})

it('opened prop has priority', async () => {
  const { getByRole, findByText } = render(
    <ComboBox opened options={options} />
  )
  expect(await findByText('Первое')).toBeInTheDocument()
  fireEvent.mouseDown(getByRole('button', { name: 'openPopupButton' }))
  expect(await findByText('Первое')).toBeInTheDocument()
  fireEvent.mouseDown(getByRole('button', { name: 'openPopupButton' }))
  expect(await findByText('Первое')).toBeInTheDocument()
})

it('placeholder is visible always when disableVisibleSelectedValue=true', () => {
  const { getByText, rerender } = render(
    <ComboBox
      disableVisibleSelectedValue
      placeholder="Placeholder"
      options={options}
    />
  )

  expect(getByText('Placeholder')).toBeInTheDocument()

  rerender(
    <ComboBox
      disableVisibleSelectedValue
      placeholder="Placeholder"
      options={options}
      value={options[0]}
    />
  )
  expect(getByText('Placeholder')).toBeInTheDocument()
})

it('closes with click on label (STS-24211)', () => {
  const { getByText, getByRole } = render(
    <ComboBox
      label="label"
      options={options}
      classes={{ optionActive: 'active' }}
    />
  )

  const openButton = getByRole('button', { name: 'openPopupButton' })
  fireEvent.mouseDown(openButton)

  const tooltip = getByRole('tooltip')
  expect(tooltip).toBeInTheDocument()

  const label = getByText('label')

  fireEvent.mouseDown(label)

  expect(tooltip).not.toBeInTheDocument()
})

it('has focus when click on label STS-30123', () => {
  const { getByText, getByRole } = render(
    <ComboBox
      label="label"
      labelProps={{
        htmlFor: 'basic-autocomplete',
      }}
      controlInnerProps={{
        id: 'basic-autocomplete',
      }}
      options={options}
    />
  )

  const label = getByText('label')

  fireEvent.click(label)

  const combobox = getByRole('combobox')

  expect(combobox).toHaveFocus()
})

it('correctly selected value by enter key press STS-30124', async () => {
  const onChange = jest.fn()
  const { getByRole, findAllByRole } = render(
    <ComboBox
      openOnFocus
      classes={{ optionActive: 'active' }}
      options={options}
      onChange={onChange}
    />
  )
  const comboboxInput = getByRole('combobox')

  userEvent.tab()

  const foundOptions = await findAllByRole('option')

  fireEvent.keyDown(comboboxInput, { key: 'ArrowDown' })

  fireEvent.keyDown(foundOptions[0], { key: 'Enter' })

  expect(onChange).toBeCalledTimes(1)
  expect(onChange).toBeCalledWith(
    '0',
    expect.anything(),
    options[0],
    'select-enter'
  )
})

it('handle delete selected value by backspace key press STS-30124', () => {
  const onChange = jest.fn()

  const { getByRole } = render(
    <ComboBox
      canClear
      options={options}
      value={options[0]}
      onChange={onChange}
    />
  )
  const comboboxInput = getByRole('combobox')

  fireEvent.keyDown(comboboxInput, { key: 'Backspace' })
  expect(onChange).toBeCalledTimes(1)
  expect(onChange).toBeCalledWith(
    '',
    expect.anything(),
    undefined,
    'force-clear'
  )
})

it('shouldnt close popup when click was on scroll', () => {
  const outsideClick = jest.fn()

  const { getByRole } = render(
    <div style={{ padding: 50 }} onMouseDown={outsideClick}>
      <ComboBox options={options} />
    </div>
  )

  const openButton = getByRole('button', { name: 'openPopupButton' })
  fireEvent.mouseDown(openButton)

  const list = getByRole('list')

  fireEvent.mouseDown(list)
  expect(outsideClick).toHaveBeenCalledTimes(0)
})

// UIK-598 (SBTSUPPORT-45624)
it('combobox not fires onBlur when click on option', async () => {
  const onChange = jest.fn()
  const onBlur = jest.fn()

  const { getByRole, findAllByRole } = render(
    <ComboBox
      options={options}
      controlInnerProps={{ onBlur }}
      onChange={onChange}
    />
  )

  const openButton = getByRole('button', { name: 'openPopupButton' })
  userEvent.click(openButton)
  const foundOptions = await findAllByRole('option')
  userEvent.click(foundOptions[2], { bubbles: true })
  expect(onChange).toBeCalledTimes(1)
  expect(onBlur).toBeCalledTimes(0)
})
