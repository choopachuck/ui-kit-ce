import * as React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { RangeMonthView, RangeMonthViewProps, useDateLibAdapter } from '../src'
import {
  adapterKeys,
  DictionaryAdapter,
  withDateLibAdapter,
} from './withDateLibAdapter'
import { jan_1, feb_1, mar_1 } from './presetDates'

const Component = withDateLibAdapter(
  ({
    adapterKey,
    value,
    onChange,
    ...rest
  }: RangeMonthViewProps<unknown> & { adapterKey: DictionaryAdapter }) => {
    const adapter = useDateLibAdapter()

    return (
      <RangeMonthView
        {...rest}
        value={
          value
            ? [adapter.date(value[0]), adapter.date(value[1])]
            : [null, null]
        }
        onChange={(v) => onChange(v ? adapter.toJsDate(v) : null)}
      />
    )
  }
)
const onChange = jest.fn()

beforeEach(() => {
  onChange.mockClear()
})

it.each(adapterKeys)(
  '[Adapter: %s] click on month emit onChange',
  (adapterKey) => {
    const { getByRole } = render(
      <Component
        value={[jan_1, null]}
        adapterKey={adapterKey}
        dateToBeChanged="end"
        onChange={onChange}
      />
    )

    const monthButton = getByRole('button', { name: /фев/i })
    fireEvent.click(monthButton)

    expect(onChange).toHaveBeenNthCalledWith(1, feb_1)
  }
)

it.each(adapterKeys)('[Adapter: %s] selected range date', (adapterKey) => {
  const { getAllByRole } = render(
    <Component
      value={[jan_1, mar_1]}
      adapterKey={adapterKey}
      dateToBeChanged="end"
      onChange={onChange}
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
