import * as React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { adapterKeys } from '../withDateLibAdapter'
import { getFormatDateString, yearFormat, getNextDay } from '../helpers'
import { Component } from './utils'

import '../../src/hooks/useMobileView'
jest.mock('../../src/hooks/useMobileView', () => ({
  useMobileView: () => false,
}))

it.each(adapterKeys)(
  '[Adapter: %s] handles maxDate correctly',
  (adapterKey) => {
    const currentDate = new Date()
    const { getByRole, getAllByRole, queryByText } = render(
      <Component
        format="dd.MM.yyyy"
        adapterKey={adapterKey}
        maxDate={currentDate}
      />
    )

    const input = getAllByRole('textbox')[0]

    fireEvent.click(input)

    const dayAfterMaxDate = getNextDay(
      currentDate,
      getAllByRole,
      adapterKey,
      'button'
    )

    if (dayAfterMaxDate) {
      expect(dayAfterMaxDate).toHaveAttribute('aria-disabled', 'true')
    }

    const currentYear = getFormatDateString(currentDate, adapterKey, yearFormat)
    const nextYear = String(Number(currentYear) + 1)
    fireEvent.click(getByRole('button', { name: currentYear }))

    expect(queryByText(nextYear)).not.toBeInTheDocument()
  }
)
