import {
  DatePicker,
  DatePickerProps,
  useDateLibAdapter,
} from '@v-uik/date-picker'
import * as React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import {
  adapterKeys,
  DictionaryAdapter,
  withDateLibAdapter,
} from './withDateLibAdapter'
import { addDays, addMonths, addYears } from 'date-fns'
import {
  getPrevDay,
  getFormatDateString,
  yearFormat,
  getNextDay,
  monthFormat,
  getDateElement,
  functionProxy,
} from './helpers'
import '../src/hooks/useMobileView'

jest.mock('../src/hooks/useMobileView', () => ({ useMobileView: () => false }))

const FORMAT = {
  dateFns: 'dd.MM.yyyy',
  dayjs: 'DD.MM.YYYY',
  luxon: 'dd.MM.yyyy',
  moment: 'DD.MM.YYYY',
}

const Component = withDateLibAdapter(
  (
    props: Omit<
      Partial<DatePickerProps<unknown>>,
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
      <>
        <DatePicker
          {...rest}
          minDate={minDate ? adapter.date(minDate) : undefined}
          maxDate={maxDate ? adapter.date(maxDate) : undefined}
          next_shouldDisableDate={functionProxy(
            adapter,
            next_shouldDisableDate
          )}
          next_shouldDisableMonth={functionProxy(
            adapter,
            next_shouldDisableMonth
          )}
          next_shouldDisableYear={functionProxy(
            adapter,
            next_shouldDisableYear
          )}
          value={date}
          onChange={(date: unknown | null) => {
            onChange?.(date)
            setDate(date)
          }}
        />
        <button type="button" onClick={() => setDate(null)}>
          clear
        </button>
      </>
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

    fireEvent.change(input, { target: { value: '21.02.200' } })
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

    fireEvent.change(input, { target: { value: '21.02.2000' } })
    expect(queryByText('Некорректная дата')).not.toBeInTheDocument()
  }
)

it.each(adapterKeys)(
  '[Adapter: %s] days in the past are disabled correctly',
  (adapterKey) => {
    const { getByRole, getAllByRole } = render(
      <Component disablePast adapterKey={adapterKey} />
    )

    const currentDate = new Date()

    const input = getByRole('combobox')

    fireEvent.click(input)

    const yesterday = getPrevDay(currentDate, getAllByRole, adapterKey)

    if (yesterday) {
      expect(yesterday).toHaveAttribute('aria-disabled', 'true')
    }
  }
)

it.each(adapterKeys)(
  '[Adapter: %s] date disabled with disableFuture is correctly',
  (adapterKey) => {
    const { getByRole, getAllByRole } = render(
      <Component disableFuture adapterKey={adapterKey} />
    )

    const currentDate = new Date()

    const input = getByRole('combobox')

    fireEvent.click(input)

    const tomorrow = getNextDay(currentDate, getAllByRole, adapterKey)

    if (tomorrow) {
      expect(tomorrow).toHaveAttribute('aria-disabled', 'true')
    }
  }
)

it.each(adapterKeys)(
  '[Adapter: %s] keyboard day calendar navigation',
  async (adapterKey) => {
    const currentDay = new Date()

    const { getByRole } = render(
      <Component value={currentDay} adapterKey={adapterKey} />
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

    fireEvent.keyDown(currentDayElement, { key: 'ArrowRight' })

    let newDay = addDays(currentDay, 1)
    let nextDayElement = getDateElement(container, newDay, adapterKey)
    expect(nextDayElement).toHaveFocus()

    fireEvent.keyDown(nextDayElement, { key: 'ArrowLeft' })
    expect(currentDayElement).toHaveFocus()

    fireEvent.keyDown(currentDayElement, { key: 'ArrowDown' })

    newDay = addDays(currentDay, 7)
    nextDayElement = getDateElement(container, newDay, adapterKey)

    expect(nextDayElement).toHaveFocus()

    fireEvent.keyDown(nextDayElement, { key: 'ArrowUp' })
    expect(currentDayElement).toHaveFocus()
  }
)

it.each(adapterKeys)(
  '[Adapter: %s] keyboard month calendar navigation',
  (adapterKey) => {
    const currentDate = new Date()

    const { getByRole } = render(
      <Component value={currentDate} adapterKey={adapterKey} />
    )

    const input = getByRole('combobox')

    fireEvent.click(input)

    fireEvent.click(
      getByRole('button', {
        name: getFormatDateString(currentDate, adapterKey, monthFormat),
      })
    )

    const container = getByRole('grid')
    const currentMonthElement = getDateElement(
      container,
      currentDate,
      adapterKey,
      monthFormat
    )
    expect(currentMonthElement).toHaveFocus()

    fireEvent.keyDown(currentMonthElement, { key: 'ArrowRight' })
    const nextMonth = addMonths(currentDate, 1)
    const nextMonthElement = getDateElement(
      container,
      nextMonth,
      adapterKey,
      monthFormat
    )

    expect(nextMonthElement).toHaveFocus()

    fireEvent.keyDown(nextMonthElement, { key: 'ArrowLeft' })

    expect(currentMonthElement).toHaveFocus()
  }
)

it.each(adapterKeys)(
  '[Adapter: %s] keyboard year calendar navigation',
  (adapterKey) => {
    const currentDate = new Date()

    const { getByRole } = render(
      <Component value={currentDate} adapterKey={adapterKey} />
    )

    const input = getByRole('combobox')

    fireEvent.click(input)

    fireEvent.click(
      getByRole('button', {
        name: getFormatDateString(currentDate, adapterKey, yearFormat),
      })
    )

    const container = getByRole('grid')
    const currentYearElement = getDateElement(
      container,
      currentDate,
      adapterKey,
      yearFormat
    )
    expect(currentYearElement).toHaveFocus()

    fireEvent.keyDown(currentYearElement, { key: 'ArrowRight' })
    const nextYear = addYears(currentDate, 1)
    const nextYearElement = getDateElement(
      container,
      nextYear,
      adapterKey,
      yearFormat
    )

    expect(nextYearElement).toHaveFocus()

    fireEvent.keyDown(nextYearElement, { key: 'ArrowLeft' })

    expect(currentYearElement).toHaveFocus()
  }
)

it.each(adapterKeys)(
  '[Adapter: %s] handles focus correctly',
  async (adapterKey) => {
    const { getByRole } = render(
      <Component format="dd.MM.yyyy" adapterKey={adapterKey} />
    )

    const currentDate = new Date()
    const input = getByRole('combobox')

    fireEvent.click(input)

    expect(input).toHaveFocus()
    expect(getByRole('tooltip')).toBeVisible()

    fireEvent.keyPress(input, { code: 'Esc' })

    expect(input).toHaveFocus()
    expect(getByRole('tooltip')).toBeVisible()

    fireEvent.keyDown(input, { key: 'ArrowDown' })

    expect(getByRole('tooltip')).toBeVisible()
    const todayButton = getDateElement(
      getByRole('grid'),
      currentDate,
      adapterKey
    )

    await waitFor(() => expect(todayButton).toHaveFocus(), { timeout: 200 })
  }
)

it.each(adapterKeys)(
  '[Adapter: %s] handles minDate correctly',
  (adapterKey) => {
    const currentDate = new Date()
    const { getByRole, getAllByRole, queryByText } = render(
      <Component
        format="dd.MM.yyyy"
        minDate={currentDate}
        adapterKey={adapterKey}
      />
    )

    const input = getByRole('combobox')

    fireEvent.click(input)

    const dayBeforeMinDate = getPrevDay(currentDate, getAllByRole, adapterKey)

    if (dayBeforeMinDate) {
      expect(dayBeforeMinDate).toHaveAttribute('aria-disabled', 'true')
    }

    const currentYear = getFormatDateString(currentDate, adapterKey, yearFormat)
    const prevYear = String(Number(currentYear) - 1)
    fireEvent.click(getByRole('button', { name: currentYear }))

    expect(queryByText(prevYear)).not.toBeInTheDocument()
  }
)

it.each(adapterKeys)(
  '[Adapter: %s] handles maxDate correctly',
  (adapterKey) => {
    const currentDate = new Date()
    const { getByRole, getAllByRole, queryByText } = render(
      <Component
        format="dd.MM.yyyy"
        maxDate={currentDate}
        adapterKey={adapterKey}
      />
    )

    const input = getByRole('combobox')

    fireEvent.click(input)

    const dayAfterMaxDate = getNextDay(currentDate, getAllByRole, adapterKey)

    if (dayAfterMaxDate) {
      expect(dayAfterMaxDate).toHaveAttribute('aria-disabled', 'true')
    }

    const currentYear = getFormatDateString(currentDate, adapterKey, yearFormat)
    const nextYear = String(Number(currentYear) + 1)
    fireEvent.click(getByRole('button', { name: currentYear }))

    expect(queryByText(nextYear)).not.toBeInTheDocument()
  }
)

it.each(adapterKeys)(
  '[Adapter: %s] handles next_shouldDisableDate correctly',
  (adapterKey) => {
    const currentDate = new Date()
    const { getByRole, getAllByRole } = render(
      <Component
        format="dd.MM.yyyy"
        next_shouldDisableDate={(date: Date) => date?.getDate() === 1}
        adapterKey={adapterKey}
      />
    )

    const input = getByRole('combobox')

    fireEvent.click(input)

    //day view disabled
    const firstDisabledComp = getAllByRole('gridcell', {
      name: '1',
    })[0]

    expect(firstDisabledComp).toHaveAttribute('aria-disabled', 'true')

    const firstEnabledComp = getAllByRole('gridcell', {
      name: '2',
    })[0]

    expect(firstEnabledComp).not.toHaveAttribute('aria-disabled', 'true')

    // month view is not affected
    fireEvent.click(
      getByRole('button', {
        name: getFormatDateString(currentDate, adapterKey, monthFormat),
      })
    )

    const currentMonthElement = getDateElement(
      getByRole('grid'),
      currentDate,
      adapterKey,
      monthFormat
    )

    expect(currentMonthElement).not.toHaveAttribute('aria-disabled', 'true')

    //year view is not affected
    fireEvent.click(
      getByRole('button', {
        name: getFormatDateString(currentDate, adapterKey, yearFormat),
      })
    )

    const currentYearElement = getDateElement(
      getByRole('grid'),
      currentDate,
      adapterKey,
      yearFormat
    )

    expect(currentYearElement).not.toHaveAttribute('aria-disabled', 'true')
  }
)

it.each(adapterKeys)(
  '[Adapter: %s] handles next_shouldDisableMonth correctly',
  (adapterKey) => {
    const currentDate = new Date()
    const { getByRole } = render(
      <Component
        format="dd.MM.yyyy"
        next_shouldDisableMonth={(date: Date) =>
          date?.getMonth() === currentDate.getMonth()
        }
        adapterKey={adapterKey}
      />
    )

    const input = getByRole('combobox')

    fireEvent.click(input)

    //day view disabled
    const firstDisabledComp = getDateElement(
      getByRole('grid'),
      currentDate,
      adapterKey
    )

    expect(firstDisabledComp).toHaveAttribute('aria-disabled', 'true')

    // month view is affected
    fireEvent.click(
      getByRole('button', {
        name: getFormatDateString(currentDate, adapterKey, monthFormat),
      })
    )

    const currentMonthElement = getDateElement(
      getByRole('grid'),
      currentDate,
      adapterKey,
      monthFormat
    )

    expect(currentMonthElement).toHaveAttribute('aria-disabled', 'true')

    //year view is not affected
    fireEvent.click(
      getByRole('button', {
        name: getFormatDateString(currentDate, adapterKey, yearFormat),
      })
    )

    const currentYearElement = getDateElement(
      getByRole('grid'),
      currentDate,
      adapterKey,
      yearFormat
    )

    expect(currentYearElement).not.toHaveAttribute('aria-disabled', 'true')
  }
)

it.each(adapterKeys)(
  '[Adapter: %s] handles next_shouldDisableYear correctly',
  (adapterKey) => {
    const currentDate = new Date()
    const { getByRole } = render(
      <Component
        format="dd.MM.yyyy"
        next_shouldDisableYear={(date: Date) =>
          date?.getFullYear() === currentDate.getFullYear()
        }
        adapterKey={adapterKey}
      />
    )

    const input = getByRole('combobox')

    fireEvent.click(input)

    //day view disabled
    const firstDisabledComp = getDateElement(
      getByRole('grid'),
      currentDate,
      adapterKey
    )

    expect(firstDisabledComp).toHaveAttribute('aria-disabled', 'true')

    // month view is affected
    fireEvent.click(
      getByRole('button', {
        name: getFormatDateString(currentDate, adapterKey, monthFormat),
      })
    )

    const currentMonthElement = getDateElement(
      getByRole('grid'),
      currentDate,
      adapterKey,
      monthFormat
    )

    expect(currentMonthElement).toHaveAttribute('aria-disabled', 'true')

    //year view is affected
    fireEvent.click(
      getByRole('button', {
        name: getFormatDateString(currentDate, adapterKey, yearFormat),
      })
    )

    const currentYearElement = getDateElement(
      getByRole('grid'),
      currentDate,
      adapterKey,
      yearFormat
    )

    expect(currentYearElement).toHaveAttribute('aria-disabled', 'true')
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
    fireEvent.change(input, { target: { value: '21.02.2002' } })

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
    fireEvent.change(input, { target: { value: '21.02.2002' } })

    expect(onChange).toHaveBeenCalled()

    const button = getByRole('button')
    button.click()

    expect(input).toHaveValue('')
  }
)
