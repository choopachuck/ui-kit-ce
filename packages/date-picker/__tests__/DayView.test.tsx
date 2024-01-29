import * as React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { DayView, useDateLibAdapter } from '../src'
import {
  adapterKeys,
  DictionaryAdapter,
  withDateLibAdapter,
} from './withDateLibAdapter'

const Component = withDateLibAdapter(
  ({
    onChange,
    shouldDisableDate,
  }: {
    onChange?: () => void
    shouldDisableDate?: () => boolean
    adapterKey: DictionaryAdapter
  }) => {
    const adapter = useDateLibAdapter()
    const [date, setDate] = React.useState<unknown | null>(
      adapter.date(new Date('2021-01-01T00:00:00.000Z'))
    )

    const handleChange = (e: unknown) => {
      if (onChange) {
        onChange()
      }
      setDate(e)
    }

    return (
      <DayView
        value={date}
        shouldDisableDate={shouldDisableDate}
        onChange={handleChange}
      />
    )
  }
)

it.each(adapterKeys)(
  '[Adapter: %s] fire onChange event if click date',
  (adapterKey) => {
    const handleChange = jest.fn()
    const { getAllByRole } = render(
      <Component adapterKey={adapterKey} onChange={handleChange} />
    )
    const firstDay = getAllByRole('gridcell', { name: /27/i })[0]

    expect(handleChange).toBeCalledTimes(0)

    fireEvent.click(firstDay)

    expect(handleChange).toBeCalledTimes(1)
  }
)

it.each(adapterKeys)(
  '[Adapter: %s] select day when pass value',
  (adapterKey) => {
    const { getAllByRole } = render(<Component adapterKey={adapterKey} />)

    expect(getAllByRole('gridcell', { name: '1' })[0].className).toMatch(
      /selected/
    )
  }
)

it.each(adapterKeys)(
  '[Adapter: %s] disabled some date if pass shouldDisableDate',
  (adapterKey) => {
    const disabledFirstElement = jest
      .fn()
      .mockReturnValueOnce(true)
      .mockReturnValue(false)

    const { getAllByRole } = render(
      <Component
        adapterKey={adapterKey}
        shouldDisableDate={disabledFirstElement}
      />
    )

    expect(getAllByRole('gridcell', { name: '28' })[0]).toHaveAttribute(
      'aria-disabled'
    )
    expect(getAllByRole('gridcell', { name: '29' })[0]).toHaveAttribute(
      'aria-disabled',
      'false'
    )
  }
)
