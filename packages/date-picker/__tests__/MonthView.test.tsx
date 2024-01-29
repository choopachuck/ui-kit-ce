import * as React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { MonthView, useDateLibAdapter } from '../src'
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
      <MonthView
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
    const { getByRole } = render(
      <Component adapterKey={adapterKey} onChange={handleChange} />
    )

    const jan = getByRole('row', { name: /янв/i })

    expect(handleChange).toBeCalledTimes(0)

    fireEvent.click(jan)

    expect(handleChange).toBeCalledTimes(1)
  }
)

it.each(adapterKeys)(
  '[Adapter: %s] select day when pass value',
  (adapterKey) => {
    const { getByRole } = render(<Component adapterKey={adapterKey} />)

    const jan = getByRole('row', { name: /янв/i })

    expect(jan.className).toMatch(/selected/i)
  }
)

it.each(adapterKeys)(
  '[Adapter: %s] disabled some date if pass shouldDisableDate',
  (adapterKey) => {
    const disabledFirstElement = jest
      .fn()
      .mockReturnValue(false)
      .mockReturnValueOnce(true)

    const { getByRole } = render(
      <Component
        adapterKey={adapterKey}
        shouldDisableDate={disabledFirstElement}
      />
    )

    const jan = getByRole('row', { name: /янв/i })
    const feb = getByRole('row', { name: /фев/i })

    expect(jan).toHaveAttribute('aria-disabled')
    expect(feb).toHaveAttribute('aria-disabled', 'false')
  }
)
