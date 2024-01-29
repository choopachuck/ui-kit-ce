import * as React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { adapterKeys } from '../withDateLibAdapter'
import { getFormatDateString, yearFormat, monthFormat } from '../helpers'
import { addMonths } from 'date-fns'
import { Component } from './utils'

import '../../src/hooks/useMobileView'
jest.mock('../../src/hooks/useMobileView', () => ({
  useMobileView: () => false,
}))

it.each(adapterKeys)(
  '[Adapter: %s] handles next_shouldDisableYear correctly',
  (adapterKey) => {
    const currentDate = new Date()
    const { getByRole, getAllByRole } = render(
      <Component
        format="dd.MM.yyyy"
        adapterKey={adapterKey}
        next_shouldDisableYear={(date) =>
          date?.getFullYear() === currentDate.getFullYear()
        }
      />
    )

    const input = getAllByRole('textbox')[0]

    fireEvent.click(input)

    //day view disabled
    const firstDisabledComp = getAllByRole('button', {
      name: String(currentDate.getDate()),
    }).filter((x) => !x.className.includes('notInMonth'))[0]

    expect(firstDisabledComp).toHaveAttribute('aria-disabled', 'true')

    // month view is affected
    fireEvent.click(
      getByRole('button', {
        name: `${getFormatDateString(
          currentDate,
          adapterKey,
          monthFormat
        )} - ${getFormatDateString(
          addMonths(currentDate, 1),
          adapterKey,
          monthFormat
        )}`,
      })
    )

    const currentMonthElement = getByRole('button', {
      name: getFormatDateString(currentDate, adapterKey, 'monthShort'),
    })

    expect(currentMonthElement).toHaveAttribute('aria-disabled', 'true')
    //year view is affected
    const yearSwitchViewButton = getAllByRole('button', {
      name: getFormatDateString(currentDate, adapterKey, yearFormat),
    }).filter((x) => !x.className.includes('yearButton'))[0]

    fireEvent.click(yearSwitchViewButton)

    const currentYearElement = getAllByRole('button', {
      name: getFormatDateString(currentDate, adapterKey, yearFormat),
    }).filter((x) => x.className.includes('yearButton'))[0]

    expect(currentYearElement).toHaveAttribute('aria-disabled', 'true')
  }
)
