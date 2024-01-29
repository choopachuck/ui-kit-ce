import * as React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { YearView, useDateLibAdapter } from '../src'
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
      <YearView
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
    const year1900 = getByRole('row', { name: /1900/i })

    expect(handleChange).toBeCalledTimes(0)

    fireEvent.click(year1900)

    expect(handleChange).toBeCalledTimes(1)
  }
)

it.each(adapterKeys)(
  '[Adapter: %s] select day when pass value',
  (adapterKey) => {
    const { getByRole } = render(<Component adapterKey={adapterKey} />)
    const year1900 = getByRole('row', { name: /2021/i })

    expect(year1900.className).toMatch(/selected/i)
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

    const year1900 = getByRole('row', { name: /1900/i })
    const year1901 = getByRole('row', { name: /1901/i })

    expect(year1900).toHaveAttribute('aria-disabled')
    expect(year1901).toHaveAttribute('aria-disabled', 'false')
  }
)
