import { TimePicker, useDateLibAdapter } from '@v-uik/date-picker'
import * as React from 'react'
import { render } from '@testing-library/react'
import {
  adapterKeys,
  DictionaryAdapter,
  withDateLibAdapter,
} from './withDateLibAdapter'
import { TimePickerProps, DisableTimeViewType } from '../src'
import userEvent from '@testing-library/user-event'
import { getTimeButton, pause } from './helpers'

const validationErrorMessages: TimePickerProps['validationErrorMessages'] = {
  invalidTime: 'Некорректное время',
  notAllowedTime: 'Время недоступно для выбора',
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
window.HTMLElement.prototype.scroll = function () {}

const Component = withDateLibAdapter(
  (
    props: Partial<TimePickerProps<unknown>> & {
      adapterKey: DictionaryAdapter
      shouldDisableTime?: (date: Date, view: DisableTimeViewType) => boolean
    }
  ) => {
    const { onChange, value, adapterKey, shouldDisableTime, ...rest } = props
    const adapter = useDateLibAdapter()
    const [date, setDate] = React.useState<unknown | null>(
      value ? adapter.date(value) : null
    )

    return (
      <TimePicker
        {...rest}
        value={date}
        mask="11:11:11"
        format="HH:mm:ss"
        validationErrorMessages={validationErrorMessages}
        baseTimePickerProps={{
          ...rest.baseTimePickerProps,
          views: ['hours', 'minutes', 'seconds'],
          shouldDisableTime: !shouldDisableTime
            ? undefined
            : (nonJsDate, view) =>
                shouldDisableTime(adapter.toJsDate(nonJsDate), view),
        }}
        onChange={(date: unknown | null) => {
          onChange?.(date)
          setDate(date)
        }}
      />
    )
  }
)

it.each(adapterKeys)(
  '[Adapter: %s] handles input from keyboard',
  async (adapterKey) => {
    const onChange = jest.fn()
    const { getByRole } = render(
      <Component adapterKey={adapterKey} onChange={onChange} />
    )

    const getErrorIcon = () => {
      return document.querySelector('div[class^="errorIcon"]')
    }

    const input = getByRole('combobox')
    input.focus()

    //ignores invalid input
    await userEvent.keyboard('q', { delay: 5 })
    expect(getErrorIcon()).toBeNull()
    expect(onChange).toHaveBeenCalledTimes(0)

    await userEvent.keyboard('1', { delay: 5 })
    expect(getErrorIcon()).not.toBeNull()
    expect(onChange).toHaveBeenCalledTimes(0)
    await userEvent.keyboard('21212', { delay: 5 })
    expect(getErrorIcon()).toBeNull()
    expect(onChange).toHaveBeenCalled()
  }
)

it.each(adapterKeys)(
  '[Adapter: %s] handles input from keyboard with trigger on change on invlalid = true',
  (adapterKey) => {
    const onChange = jest.fn()
    const { getByRole } = render(
      <Component
        triggerOnChangeOnInvalid
        adapterKey={adapterKey}
        onChange={onChange}
      />
    )

    const getErrorIcon = () => {
      return document.querySelector('div[class^="errorIcon"]')
    }

    const input = getByRole('combobox')
    input.focus()

    userEvent.keyboard('1')
    expect(onChange).toHaveBeenCalled()
    expect(getErrorIcon()).not.toBeNull()
  }
)

it.each(adapterKeys)(
  '[Adapter: %s] handles change time from time panel',
  async (adapterKey) => {
    const onChange = jest.fn()
    const { getByRole, findByRole } = render(
      <Component adapterKey={adapterKey} onChange={onChange} />
    )

    const input = getByRole('combobox')
    input.click()
    const dialog = await findByRole('dialog')

    const time = 4
    const hourButton = getTimeButton(dialog, 1, time)

    userEvent.click(hourButton)

    expect(onChange).toHaveBeenCalledTimes(1)

    const minButton = getTimeButton(dialog, 2, time)

    userEvent.click(minButton)

    expect(onChange).toHaveBeenCalledTimes(2)

    const secButton = getTimeButton(dialog, 3, time)

    userEvent.click(secButton)

    expect(onChange).toHaveBeenCalledTimes(3)
  }
)

it.each(adapterKeys)(
  '[Adapter: %s] handles change time on min click',
  async (adapterKey) => {
    const onChange = jest.fn()
    const { getByRole, findByRole } = render(
      <Component adapterKey={adapterKey} onChange={onChange} />
    )

    const input = getByRole('combobox')
    input.click()
    const dialog = await findByRole('dialog')

    const time = 4

    const minButton = getTimeButton(dialog, 2, time)

    userEvent.click(minButton)

    expect(onChange).toHaveBeenCalledTimes(1)
  }
)

it.each(adapterKeys)(
  '[Adapter: %s] handles change time on sec click',
  async (adapterKey) => {
    const onChange = jest.fn()
    const { getByRole, findByRole } = render(
      <Component adapterKey={adapterKey} onChange={onChange} />
    )

    const input = getByRole('combobox')
    input.click()
    const dialog = await findByRole('dialog')

    const time = 4

    const secButton = getTimeButton(dialog, 3, time)

    userEvent.click(secButton)

    expect(onChange).toHaveBeenCalledTimes(1)
  }
)

it.each(adapterKeys)(
  '[Adapter: %s] handles keyboard navigation',
  async (adapterKey) => {
    const onChange = jest.fn()
    const { getByRole, findByRole } = render(
      <Component adapterKey={adapterKey} onChange={onChange} />
    )

    const input = getByRole('combobox')
    input.click()
    const dialog = await findByRole('dialog')

    expect(getTimeButton(dialog, 1, 0)).not.toHaveFocus()

    userEvent.keyboard('[ArrowDown]')

    await pause(100)

    expect(getTimeButton(dialog, 1, 0)).toHaveFocus()

    userEvent.keyboard('[ArrowRight]')

    expect(getTimeButton(dialog, 1, 1)).toHaveFocus()

    userEvent.keyboard('[Enter]')
    expect(getTimeButton(dialog, 2, 0)).toHaveFocus()
    expect(onChange).toHaveBeenCalledTimes(1)

    userEvent.tab({ shift: true })
    expect(getTimeButton(dialog, 1, 1)).toHaveFocus()

    userEvent.tab()
    userEvent.keyboard('[Enter]')
    expect(onChange).toHaveBeenCalledTimes(2)

    expect(getTimeButton(dialog, 3, 0)).toHaveFocus()
    userEvent.keyboard('[Enter]')
    expect(onChange).toHaveBeenCalledTimes(3)

    expect(dialog).not.toBeInTheDocument()

    expect(input).toHaveFocus()
    userEvent.keyboard('[Enter]')

    expect(getByRole('dialog')).toBeInTheDocument()
    userEvent.keyboard('[Esc]')
    expect(dialog).not.toBeInTheDocument()
  }
)

it.each(adapterKeys)('[Adapter: %s] disabled times', async (adapterKey) => {
  const onChange = jest.fn()
  const shouldDisableTime = (date: Date, view: DisableTimeViewType) => {
    if (view === 'hours') {
      return date.getHours() === 1
    }

    return false
  }
  const { getByRole, findByRole } = render(
    <Component
      adapterKey={adapterKey}
      shouldDisableTime={shouldDisableTime}
      onChange={onChange}
    />
  )

  const input = getByRole('combobox')
  input.click()
  const dialog = await findByRole('dialog')

  const disabledHour = getTimeButton(dialog, 1, 1)
  expect(disabledHour).toHaveAttribute('aria-disabled', 'true')

  const enabledHour = getTimeButton(dialog, 1, 2)
  expect(enabledHour).toHaveAttribute('aria-disabled', 'false')
  userEvent.click(enabledHour)
  expect(onChange).toHaveBeenCalledTimes(1)
})

it.each(adapterKeys)('[Adapter: %s] interval', async (adapterKey) => {
  const { getByRole, findByRole } = render(
    <Component
      adapterKey={adapterKey}
      baseTimePickerProps={{
        secondsStep: 15,
      }}
    />
  )

  const input = getByRole('combobox')
  input.click()
  const dialog = await findByRole('dialog')

  const button0 = getTimeButton(dialog, 3, 0)
  expect(button0).toHaveTextContent('00')
  const button15 = getTimeButton(dialog, 3, 1)
  expect(button15).toHaveTextContent('15')
  const button30 = getTimeButton(dialog, 3, 2)
  expect(button30).toHaveTextContent('30')
  const button45 = getTimeButton(dialog, 3, 3)
  expect(button45).toHaveTextContent('45')
})

it.each(adapterKeys)('[Adapter: %s] invalid time error', (adapterKey) => {
  const { getByRole, getByText } = render(<Component adapterKey={adapterKey} />)

  const input = getByRole('combobox')
  userEvent.click(input)
  userEvent.keyboard('1')

  expect(
    getByText(validationErrorMessages.invalidTime as string)
  ).toBeInTheDocument()
})

it.each(adapterKeys)(
  '[Adapter: %s] not allowed time error',
  async (adapterKey) => {
    const { getByRole, getByText } = render(
      <Component
        adapterKey={adapterKey}
        shouldDisableTime={(date, view) => {
          if (view === 'minutes') {
            return [0, 1, 2, 3, 4, 5, 6].includes(date.getMinutes())
          }

          return false
        }}
      />
    )

    const input = getByRole('combobox')

    userEvent.click(input)

    await userEvent.keyboard('11:03:00', { delay: 5 })

    expect(
      getByText(validationErrorMessages.notAllowedTime as string)
    ).toBeInTheDocument()
  }
)
