import * as React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { adapterKeys } from '../withDateLibAdapter'
import { getPrevDay, getFormatDateString, yearFormat } from '../helpers'
import { Component } from './utils'

import '../../src/hooks/useMobileView'
jest.mock('../../src/hooks/useMobileView', () => ({
  useMobileView: () => false,
}))

it.each(adapterKeys)(
  '[Adapter: %s] handles minDate correctly',
  (adapterKey) => {
    const currentDate = new Date()
    const { getByRole, getAllByRole, queryByText } = render(
      <Component
        format="dd.MM.yyyy"
        adapterKey={adapterKey}
        minDate={currentDate}
      />
    )

    const input = getAllByRole('textbox')[0]

    fireEvent.click(input)

    const dayBeforeMinDate = getPrevDay(
      currentDate,
      getAllByRole,
      adapterKey,
      'button'
    )

    if (dayBeforeMinDate) {
      expect(dayBeforeMinDate).toHaveAttribute('aria-disabled', 'true')
    }

    const currentYear = getFormatDateString(currentDate, adapterKey, yearFormat)
    const prevYear = String(Number(currentYear) - 1)
    fireEvent.click(getByRole('button', { name: currentYear }))

    expect(queryByText(prevYear)).not.toBeInTheDocument()
  }
)
