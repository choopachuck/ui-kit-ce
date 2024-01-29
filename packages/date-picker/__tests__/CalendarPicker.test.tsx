import * as React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { CalendarPicker, CalendarPickerProps, useDateLibAdapter } from '../src'
import { CalendarPickerViews } from '../src/interfaces'
import {
  adapterKeys,
  DictionaryAdapter,
  withDateLibAdapter,
} from './withDateLibAdapter'

jest.mock('../src/views/DayView')
jest.mock('../src/views/MonthView')
jest.mock('../src/views/YearView')

const Component = withDateLibAdapter(
  (
    props: Partial<CalendarPickerProps<unknown>> & {
      adapterKey: DictionaryAdapter
    }
  ) => {
    const { onChange, adapterKey, ...rest } = props
    const adapter = useDateLibAdapter()
    const [date, setDate] = React.useState<unknown | null>(
      adapter.date(new Date(2021, 1, 1))
    )

    return (
      <CalendarPicker
        {...rest}
        value={date}
        onChange={(date) => {
          onChange?.(date)
          setDate(date)
        }}
      />
    )
  }
)

describe.each(Object.values(CalendarPickerViews))('render %s view', (view) => {
  it.each(adapterKeys)('[Adapter: %s] with value prop', (adapterKey) => {
    const { getByText } = render(
      <Component defaultView={view} adapterKey={adapterKey} />
    )

    expect(getByText(`${view} - 2021-02-01T00:00:00.000Z`)).toBeInTheDocument()
  })

  it.each(adapterKeys)('[Adapter: %s] with onChange prop', (adapterKey) => {
    const handleChange = jest.fn()
    const { getByText } = render(
      <Component
        defaultView={view}
        adapterKey={adapterKey}
        onChange={handleChange}
      />
    )
    const button = getByText(`${view} - 2021-02-01T00:00:00.000Z`)

    expect(handleChange).toBeCalledTimes(0)

    fireEvent.click(button)

    const expected = view === 'day' ? 1 : 0

    expect(handleChange).toBeCalledTimes(expected)
  })
})
