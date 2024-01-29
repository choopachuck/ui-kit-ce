import * as React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { RangeYearView, RangeYearViewProps, useDateLibAdapter } from '../src'
import {
  adapterKeys,
  DictionaryAdapter,
  withDateLibAdapter,
} from './withDateLibAdapter'
import { jan_1, next_year_jan_1, next_two_years_jan_1 } from './presetDates'

const Component = withDateLibAdapter(
  ({
    adapterKey,
    value,
    onChange,
    ...rest
  }: RangeYearViewProps<unknown> & { adapterKey: DictionaryAdapter }) => {
    const adapter = useDateLibAdapter()

    return (
      <RangeYearView
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
  '[Adapter: %s] click on year emit onChange',
  (adapterKey) => {
    const { getByRole } = render(
      <Component
        value={[jan_1, null]}
        dateToBeChanged="end"
        adapterKey={adapterKey}
        onChange={onChange}
      />
    )

    const yearButton = getByRole('button', { name: '2022' })
    fireEvent.click(yearButton)

    expect(onChange).toHaveBeenNthCalledWith(1, next_year_jan_1)
  }
)

it.each(adapterKeys)('[Adapter: %s] selected range date', (adapterKey) => {
  const { getAllByRole } = render(
    <Component
      value={[jan_1, next_two_years_jan_1]}
      dateToBeChanged="end"
      adapterKey={adapterKey}
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
