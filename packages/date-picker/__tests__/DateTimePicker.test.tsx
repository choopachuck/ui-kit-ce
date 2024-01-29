import {
  DateTimePicker,
  DateTimePickerProps,
  useDateLibAdapter,
} from '@v-uik/date-picker'
import * as React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'

import {
  adapterKeys,
  DictionaryAdapter,
  withDateLibAdapter,
} from './withDateLibAdapter'

import {
  dayFormat,
  functionProxy,
  getDateElement,
  getFormatDateString,
  getTimeButton,
  pause,
} from './helpers'
import '../src/hooks/useMobileView'

import userEvent from '@testing-library/user-event'

// eslint-disable-next-line @typescript-eslint/no-empty-function
window.HTMLElement.prototype.scroll = function () {}

jest.mock('../src/hooks/useMobileView', () => ({ useMobileView: () => false }))

const FORMAT = {
  dateFns: 'dd.MM.yyyy HH:mm',
  dayjs: 'DD.MM.YYYY HH:mm',
  luxon: 'dd.MM.yyyy hh:mm',
  moment: 'DD.MM.YYYY HH:mm',
}

const Component = withDateLibAdapter(
  (
    props: Omit<
      Partial<DateTimePickerProps<unknown>>,
      | 'next_shouldDisableDate'
      | 'next_shouldDisableMonth'
      | 'next_shouldDisableYear'
      | 'minDate'
      | 'maxDate'
    > & {
      adapterKey: DictionaryAdapter
      minDate?: Date
      maxDate?: Date
      next_shouldDisableDate?: (v: Date) => boolean
      next_shouldDisableMonth?: (v: Date) => boolean
      next_shouldDisableYear?: (v: Date) => boolean
    }
  ) => {
    const {
      onChange,
      value,
      next_shouldDisableDate,
      next_shouldDisableMonth,
      next_shouldDisableYear,
      minDate,
      maxDate,
      adapterKey,
      ...rest
    } = props
    const adapter = useDateLibAdapter()
    const [date, setDate] = React.useState<unknown | null>(
      value ? adapter.date(value) : null
    )

    return (
      <DateTimePicker
        {...rest}
        minDate={minDate ? adapter.date(minDate) : undefined}
        maxDate={maxDate ? adapter.date(maxDate) : undefined}
        next_shouldDisableDate={functionProxy(adapter, next_shouldDisableDate)}
        next_shouldDisableMonth={functionProxy(
          adapter,
          next_shouldDisableMonth
        )}
        next_shouldDisableYear={functionProxy(adapter, next_shouldDisableYear)}
        value={date}
        onChange={(date: unknown | null) => {
          onChange?.(date)
          setDate(date)
        }}
      />
    )
  }
)

it.each(adapterKeys)(
  '[Adapter: %s] date validation with format handles invalid',
  (adapterKey) => {
    const { getByRole, getByText } = render(
      <Component adapterKey={adapterKey} format={FORMAT[adapterKey]} />
    )

    const input = getByRole('combobox')

    fireEvent.change(input, { target: { value: '21.02.2020 17:' } })
    expect(getByText('Некорректная дата')).toBeInTheDocument()
  }
)

it.each(adapterKeys)(
  '[Adapter: %s] date validation with format handles valid',
  (adapterKey) => {
    const { getByRole, queryByText } = render(
      <Component adapterKey={adapterKey} format={FORMAT[adapterKey]} />
    )

    const input = getByRole('combobox')

    fireEvent.change(input, { target: { value: '21.02.2020 17:30' } })
    expect(queryByText('Некорректная дата')).not.toBeInTheDocument()
  }
)

it.each(adapterKeys)(
  '[Adapter: %s] keyboard time picker navigation',
  async (adapterKey) => {
    const currentDay = new Date()

    const { getByRole } = render(
      <Component adapterKey={adapterKey} format={FORMAT[adapterKey]} />
    )

    const input = getByRole('combobox')

    fireEvent.click(input)

    const container = getByRole('grid')
    const currentDayElement = getDateElement(container, currentDay, adapterKey)

    expect(input).toHaveFocus()

    fireEvent.keyDown(input, { key: 'ArrowDown' })

    await waitFor(() => expect(currentDayElement).toHaveFocus(), {
      timeout: 200,
    })

    userEvent.keyboard('[Enter]')
    const timePickerContainer = getByRole('tooltip')

    let optionZero = getTimeButton(timePickerContainer, 1, 0)
    await pause(100)
    expect(optionZero).toHaveFocus()

    userEvent.keyboard('[ArrowDown]')

    let optionFirst = getTimeButton(timePickerContainer, 1, 1)
    expect(optionFirst).toHaveFocus()

    userEvent.keyboard('[Enter]')

    optionZero = getTimeButton(timePickerContainer, 2, 0)
    await pause(100)
    expect(optionZero).toHaveFocus()

    userEvent.keyboard('[ArrowDown]')

    optionFirst = getTimeButton(timePickerContainer, 2, 1)
    expect(optionFirst).toHaveFocus()

    userEvent.keyboard('[Enter]')

    const value = getFormatDateString(currentDay, adapterKey, dayFormat)

    expect(input).toHaveValue(`${value} 01:01`)
  }
)

it.each(adapterKeys)(
  '[Adapter: %s] mouse time picker navigation',
  async (adapterKey) => {
    const currentDay = new Date()

    const { getByRole } = render(
      <Component adapterKey={adapterKey} format={FORMAT[adapterKey]} />
    )

    const input = getByRole('combobox')

    userEvent.click(input)

    expect(input).toHaveFocus()
    const container = getByRole('tooltip')

    let optionFirst = getTimeButton(container, 1, 1)

    userEvent.click(optionFirst)
    await pause(200)

    optionFirst = getTimeButton(container, 2, 1)
    userEvent.click(optionFirst)
    await pause(200)

    const value = getFormatDateString(currentDay, adapterKey, dayFormat)

    expect(input).toHaveValue(`${value} 01:01`)
  }
)

it.each(adapterKeys)(
  '[Adapter: %s] triggerOnChangeOnInvalid = false',
  (adapterKey) => {
    const currentDate = new Date()
    const onChange = jest.fn()
    const { getByRole } = render(
      <Component
        format={FORMAT[adapterKey]}
        minDate={currentDate}
        adapterKey={adapterKey}
        onChange={onChange}
      />
    )

    const input = getByRole('combobox')
    fireEvent.change(input, { target: { value: '21.02.2002 17:30' } })

    expect(onChange).not.toHaveBeenCalled()
  }
)

it.each(adapterKeys)(
  '[Adapter: %s] triggerOnChangeOnInvalid = true',
  (adapterKey) => {
    const currentDate = new Date()
    const onChange = jest.fn()
    const { getByRole } = render(
      <Component
        triggerOnChangeOnInvalid
        format="dd.MM.yyyy"
        minDate={currentDate}
        adapterKey={adapterKey}
        onChange={onChange}
      />
    )

    const input = getByRole('combobox')
    fireEvent.change(input, { target: { value: '21.02.2002 17:30' } })

    expect(onChange).toHaveBeenCalled()
  }
)
