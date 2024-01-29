import {
  TimePickerProps,
  TimeRangePicker,
  useDateLibAdapter,
} from '@v-uik/date-picker'
import * as React from 'react'
import { render } from '@testing-library/react'
import {
  adapterKeys,
  DictionaryAdapter,
  withDateLibAdapter,
} from './withDateLibAdapter'
import { TimeRangePickerProps } from '../src'
import userEvent from '@testing-library/user-event'
import { getTimeButton, pause } from './helpers'
import { TRangeDate } from '../src/interfaces'

// eslint-disable-next-line @typescript-eslint/no-empty-function
window.HTMLElement.prototype.scroll = function () {}

const validationErrorMessages: TimePickerProps['validationErrorMessages'] = {
  invalidTime: 'Некорректное время',
  notAllowedTime: 'Время недоступно для выбора',
  isAfterEndTime: 'Время начала позже времени конца',
  isBeforeStartTime: 'Время конца раньше времени начала',
}

const errorIconSelector = 'svg[class^="errorIcon"] :not([class^="emptyIcon"])'

const Component = withDateLibAdapter(
  (
    props: Partial<TimeRangePickerProps<unknown>> & {
      adapterKey: DictionaryAdapter
    }
  ) => {
    const { onChange, value, adapterKey, ...rest } = props
    const adapter = useDateLibAdapter()
    const [range, setRange] = React.useState<
      [unknown | number | null, unknown | number | null]
    >(value ? [adapter.date(value[0]), adapter.date(value[1])] : [null, null])

    return (
      <TimeRangePicker
        {...rest}
        value={range}
        mask="11:11:11"
        validationErrorMessages={validationErrorMessages}
        format="HH:mm:ss"
        startInputProps={{ placeholder: 'hh:mm:ss' }}
        endInputProps={{ placeholder: 'hh:mm:ss' }}
        startTimePickerProps={{ views: ['hours', 'minutes', 'seconds'] }}
        endTimePickerProps={{ views: ['hours', 'minutes', 'seconds'] }}
        onChange={(range) => {
          onChange?.([
            range[0] ? adapter.toJsDate(range[0]) : null,
            range[1] ? adapter.toJsDate(range[1]) : null,
          ])
          setRange(range)
        }}
      />
    )
  }
)

it.each(adapterKeys)(
  '[Adapter: %s] handles input from keyboard',
  (adapterKey) => {
    const onChange = jest.fn()
    const { getAllByRole } = render(
      <Component adapterKey={adapterKey} onChange={onChange} />
    )

    const [startInput, endInput] = getAllByRole('textbox')
    startInput.focus()
    userEvent.keyboard('121212')
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(startInput).toHaveValue('12:12:12')

    endInput.focus()

    userEvent.keyboard('222222')
    expect(onChange).toHaveBeenCalledTimes(2)
    expect(endInput).toHaveValue('22:22:22')
  }
)

it.each(adapterKeys)(
  '[Adapter: %s] can not select end date before start date',
  async (adapterKey) => {
    const onChange = jest.fn()
    const { getAllByRole, findByRole } = render(
      <Component adapterKey={adapterKey} onChange={onChange} />
    )

    const [startInput, endInput] = getAllByRole('textbox')

    startInput.click()

    let dialog = await findByRole('tooltip')
    userEvent.click(getTimeButton(dialog, 1, 3))
    userEvent.click(getTimeButton(dialog, 3, 0))
    expect(onChange).toHaveBeenCalledTimes(2)
    await pause(100)
    expect(dialog).not.toBeVisible()
    endInput.click()

    dialog = await findByRole('tooltip')
    expect(dialog).toBeVisible()

    const endHourButton = getTimeButton(dialog, 1, 1)
    expect(endHourButton).toHaveAttribute('aria-disabled', 'true')
  }
)

it.each(adapterKeys)(
  '[Adapter: %s] invalid if end is before start',
  (adapterKey) => {
    const onChange = jest.fn()
    const { getAllByRole, container, getByText } = render(
      <Component adapterKey={adapterKey} onChange={onChange} />
    )

    const [startInput, endInput] = getAllByRole('textbox')
    startInput.focus()
    userEvent.keyboard('230000')
    expect(onChange).toHaveBeenCalledTimes(1)

    endInput.focus()

    userEvent.keyboard('200000')
    expect(onChange).toHaveBeenCalledTimes(1)
    let errorIcon = container.querySelector(errorIconSelector)
    expect(errorIcon).not.toBeNull()
    expect(
      getByText(validationErrorMessages.isBeforeStartTime as string)
    ).toBeInTheDocument()

    userEvent.clear(endInput)
    userEvent.keyboard('233000')
    expect(onChange).toHaveBeenCalledTimes(2)
    errorIcon = container.querySelector(errorIconSelector)
    expect(errorIcon).toBeNull()
  }
)

it.each(adapterKeys)(
  '[Adapter: %s] invalid if start is after end ',
  (adapterKey) => {
    const onChange = jest.fn()
    const { getAllByRole, container, getByText } = render(
      <Component adapterKey={adapterKey} onChange={onChange} />
    )

    const [startInput, endInput] = getAllByRole('textbox')
    endInput.focus()
    userEvent.keyboard('150000')
    expect(onChange).toHaveBeenCalledTimes(1)

    startInput.focus()

    userEvent.keyboard('200000')
    expect(onChange).toHaveBeenCalledTimes(1)
    let errorIcon = container.querySelector(errorIconSelector)
    expect(errorIcon).not.toBeNull()
    expect(
      getByText(validationErrorMessages.isAfterEndTime as string)
    ).toBeInTheDocument()

    userEvent.clear(startInput)
    userEvent.keyboard('140000')
    expect(onChange).toHaveBeenCalledTimes(2)
    errorIcon = container.querySelector(errorIconSelector)
    expect(errorIcon).toBeNull()
  }
)

it.each(adapterKeys)(
  '[Adapter: %s] handles keyboard navigation',
  async (adapterKey) => {
    const onChange = jest.fn()
    const { getAllByRole, findByRole } = render(
      <Component adapterKey={adapterKey} onChange={onChange} />
    )

    const [startInput] = getAllByRole('textbox')

    startInput.focus()

    userEvent.keyboard('[ArrowDown]')

    await pause(100)

    let dialog = await findByRole('tooltip')

    expect(getTimeButton(dialog, 1, 0)).toHaveFocus()
    userEvent.keyboard('[Enter]')

    expect(getTimeButton(dialog, 2, 0)).toHaveFocus()
    userEvent.keyboard('[Enter]')

    expect(getTimeButton(dialog, 3, 0)).toHaveFocus()
    userEvent.keyboard('[Enter]')

    expect(onChange).toHaveBeenCalledTimes(3)

    await pause(100)

    expect(dialog).not.toBeVisible()

    userEvent.keyboard('[Enter]')
    await pause(100)
    userEvent.keyboard('[ArrowDown]') //TODO: должно открываться по одному клику вниз

    await pause(100)

    dialog = await findByRole('tooltip')

    expect(getTimeButton(dialog, 1, 0)).toHaveFocus()
    userEvent.keyboard('[Enter]')

    expect(getTimeButton(dialog, 2, 0)).toHaveFocus()
    userEvent.keyboard('[Enter]')

    expect(getTimeButton(dialog, 3, 0)).toHaveFocus()
    userEvent.keyboard('[Enter]')

    expect(onChange).toHaveBeenCalledTimes(6)

    await pause(100)

    expect(dialog).not.toBeVisible()
  }
)

it.each(adapterKeys)('[Adapter: %s] invalid time error', (adapterKey) => {
  const { getAllByRole, getByText } = render(
    <Component adapterKey={adapterKey} />
  )

  const [startInput] = getAllByRole('textbox')

  userEvent.click(startInput)
  userEvent.keyboard('1')

  expect(
    getByText(validationErrorMessages.invalidTime as string)
  ).toBeInTheDocument()
})

// UIK-203
it.each(adapterKeys)(
  '[Adapter: %s] not skips outrange value after correction using keyboard with triggerOnChangeOnInvalid=true',
  (adapterKey) => {
    const onChange = jest.fn((v: TRangeDate<unknown>) => v)
    const { getAllByRole, container, getByText } = render(
      <Component
        triggerOnChangeOnInvalid
        adapterKey={adapterKey}
        onChange={onChange}
      />
    )

    const [startInput, endInput] = getAllByRole('textbox')

    // Указываем дату конца раньше даты начала (10:00:00) с клавиатуры
    endInput.focus()
    userEvent.keyboard('100000')

    expect(endInput).toHaveValue('10:00:00')
    expect(onChange).toHaveBeenCalledTimes(6)

    // Указываем дату начала позже даты конца (11:00:00) с клавиатуры
    startInput.focus()
    userEvent.keyboard('110000')

    expect(startInput).toHaveValue('11:00:00')
    expect(onChange).toHaveBeenCalledTimes(12)

    // Проверяем что есть ошибка валидации
    expect(
      getByText(validationErrorMessages.isAfterEndTime as string)
    ).toBeInTheDocument()

    // Указываем валидную дату конца (12:00:00) с клавиатуры
    userEvent.clear(endInput)
    endInput.focus()
    userEvent.keyboard('120000')

    // Проверяем, что дата начала (11:00:00) не сбросилась
    const expectedDateStart = new Date()
    const expectedDateEnd = new Date()

    expectedDateStart.setHours(11, 0, 0, 0)
    expectedDateEnd.setHours(12, 0, 0, 0)

    expect(startInput).toHaveValue('11:00:00')
    expect(endInput).toHaveValue('12:00:00')
    expect(onChange).toHaveBeenCalledTimes(19)
    expect(onChange).lastReturnedWith([expectedDateStart, expectedDateEnd])

    // Поверяем, что ошибка отсутствует
    const errorIcon = container.querySelector(errorIconSelector)
    expect(errorIcon).toBeNull()
  }
)

// UIK-203
it.each(adapterKeys)(
  '[Adapter: %s] not skips outrange value after correction using select',
  async (adapterKey) => {
    const onChange = jest.fn((v: TRangeDate<unknown>) => v)
    const { getAllByRole, container, findByRole, getByText } = render(
      <Component adapterKey={adapterKey} onChange={onChange} />
    )

    const [startInput, endInput] = getAllByRole('textbox')

    // Указываем дату начала позже даты конца (10:00:00) с помощью тултипа
    startInput.click()

    let dialog = await findByRole('tooltip')
    userEvent.click(getTimeButton(dialog, 1, 10))
    userEvent.click(getTimeButton(dialog, 2, 0))
    userEvent.click(getTimeButton(dialog, 3, 0))
    expect(onChange).toHaveBeenCalledTimes(3)
    await pause(100)
    expect(dialog).not.toBeVisible()
    startInput.click()

    // Указываем дату конца раньше даты начала (09:00:00) с клавиатуры
    endInput.focus()
    userEvent.keyboard('090000')

    expect(endInput).toHaveValue('09:00:00')
    expect(onChange).toHaveBeenCalledTimes(3)

    // Проверяем что есть ошибка валидации
    expect(
      getByText(validationErrorMessages.isBeforeStartTime as string)
    ).toBeInTheDocument()

    // Указываем валидную дату начала (08:00:00) с помощью тултипа
    userEvent.clear(startInput)
    startInput.click()

    dialog = await findByRole('tooltip')
    userEvent.click(getTimeButton(dialog, 1, 8))
    userEvent.click(getTimeButton(dialog, 2, 0))
    userEvent.click(getTimeButton(dialog, 3, 0))

    // Проверяем, что дата конца (09:00:00) не сбросилась
    const expectedDateStart = new Date()
    const expectedDateEnd = new Date()

    expectedDateStart.setHours(8, 0, 0, 0)
    expectedDateEnd.setHours(9, 0, 0, 0)

    expect(startInput).toHaveValue('08:00:00')
    expect(endInput).toHaveValue('09:00:00')
    expect(onChange).toHaveBeenCalledTimes(7)
    expect(onChange).lastReturnedWith([expectedDateStart, expectedDateEnd])

    // Поверяем, что ошибка отсутствует
    const errorIcon = container.querySelector(errorIconSelector)
    expect(errorIcon).toBeNull()
  }
)

it.each(adapterKeys)(
  '[Adapter: %s] shows correct value in dropdown if date is invalid',
  async (adapterKey) => {
    const onChange = jest.fn((v: TRangeDate<unknown>) => v)
    const { getAllByRole, findByRole, getByText } = render(
      <Component adapterKey={adapterKey} onChange={onChange} />
    )

    const [startInput] = getAllByRole('textbox')

    // Указываем дату начала позже даты конца (01:01:01) с помощью тултипа
    startInput.click()

    let dialog = await findByRole('tooltip')
    userEvent.click(getTimeButton(dialog, 1, 1))
    userEvent.click(getTimeButton(dialog, 2, 1))
    userEvent.click(getTimeButton(dialog, 3, 1))
    expect(onChange).toHaveBeenCalledTimes(3)
    await pause(100)
    expect(dialog).not.toBeVisible()

    userEvent.keyboard('[ArrowDown]')

    await pause(100)

    dialog = await findByRole('tooltip')

    // Указываем дату конца раньше даты начала (01:00:00) с клавиатуры
    userEvent.click(getTimeButton(dialog, 1, 1))

    expect(getTimeButton(dialog, 1, 1).className.includes('selected')).toBe(
      true
    )
    expect(getTimeButton(dialog, 2, 0).className.includes('selected')).toBe(
      true
    )
    expect(getTimeButton(dialog, 3, 0).className.includes('selected')).toBe(
      true
    )

    // Проверяем что есть ошибка валидации
    expect(
      getByText(validationErrorMessages.isBeforeStartTime as string)
    ).toBeInTheDocument()
  }
)
