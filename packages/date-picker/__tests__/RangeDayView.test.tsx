import * as React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { RangeDayView, RangeDayViewProps, useDateLibAdapter } from '../src'
import {
  adapterKeys,
  DictionaryAdapter,
  withDateLibAdapter,
} from './withDateLibAdapter'
import { jan_1, jan_2, jan_4 } from './presetDates'

const Component = withDateLibAdapter(
  ({
    adapterKey,
    value,
    onChange,
    ...rest
  }: RangeDayViewProps<unknown> & { adapterKey: DictionaryAdapter }) => {
    const adapter = useDateLibAdapter()

    return (
      <RangeDayView
        value={
          value
            ? [adapter.date(value[0]), adapter.date(value[1])]
            : [null, null]
        }
        onChange={(v) =>
          onChange(
            v ? [adapter.toJsDate(v[0]), adapter.toJsDate(v[1])] : [null, null]
          )
        }
        {...rest}
      />
    )
  }
)
const onChange = jest.fn()
const onDateToBeChangedToggle = jest.fn()

beforeEach(() => {
  onChange.mockClear()
  onDateToBeChangedToggle.mockClear()
})

it.each(adapterKeys)(
  '[Adapter: %s] click on day emit onChange',
  (adapterKey) => {
    const { getAllByRole } = render(
      <Component
        value={[jan_1, null]}
        adapterKey={adapterKey}
        dateToBeChanged="end"
        onChange={onChange}
        onDateToBeChangedToggle={onDateToBeChangedToggle}
      />
    )

    const dayButton = getAllByRole('button', { name: '2' })[0]
    fireEvent.click(dayButton)

    expect(onChange).toHaveBeenNthCalledWith(1, [jan_1, jan_2])
  }
)

it.each(adapterKeys)(
  '[Adapter: %s] click on day emit onDateToBeChangedToggle',
  (adapterKey) => {
    const { getAllByRole } = render(
      <Component
        value={[jan_1, null]}
        dateToBeChanged="end"
        adapterKey={adapterKey}
        onChange={onChange}
        onDateToBeChangedToggle={onDateToBeChangedToggle}
      />
    )

    const dayButton = getAllByRole('button', { name: '2' })[0]
    fireEvent.click(dayButton)

    expect(onDateToBeChangedToggle).toHaveBeenNthCalledWith(1, 'start')
  }
)

it.each(adapterKeys)('[Adapter: %s] selected range date', (adapterKey) => {
  const { getAllByRole } = render(
    <Component
      value={[jan_2, jan_4]}
      dateToBeChanged="end"
      adapterKey={adapterKey}
      onChange={onChange}
      onDateToBeChangedToggle={onDateToBeChangedToggle}
    />
  )

  const selectedDates = getAllByRole('button').filter((el) =>
    el.className.match(/selected/)
  )
  expect(selectedDates).toHaveLength(2)

  const inWithinDates = getAllByRole('button').filter((el) =>
    el.className.match(/withinRange/)
  )
  expect(inWithinDates).toHaveLength(1)
})
