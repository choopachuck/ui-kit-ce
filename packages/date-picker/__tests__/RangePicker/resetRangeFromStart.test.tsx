import * as React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { adapterKeys } from '../withDateLibAdapter'
import { getFormatDateString, yearFormat } from '../helpers'
import { addYears } from 'date-fns'
import { Component } from './utils'

import '../../src/hooks/useMobileView'
jest.mock('../../src/hooks/useMobileView', () => ({
  useMobileView: () => false,
}))

it.each(adapterKeys)('[Adapter: %s] reset range from start', (adapterKey) => {
  const startDate = new Date('02/21/2002')
  const expectedDate = addYears(startDate, -1)
  const onChange = jest.fn()
  const { getAllByRole, getByRole } = render(
    <Component
      triggerOnChangeOnInvalid
      format="dd.MM.yyyy"
      adapterKey={adapterKey}
      value={[startDate, null]}
      onChange={onChange}
    />
  )

  const endInput = getAllByRole('textbox')[1]

  fireEvent.click(endInput)

  const yearSwitchViewButton = getAllByRole('button', {
    name: getFormatDateString(startDate, adapterKey, yearFormat),
  }).filter((x) => !x.className.includes('yearButton'))[0]

  fireEvent.click(yearSwitchViewButton)

  const prevYearElement = getAllByRole('button', {
    name: getFormatDateString(expectedDate, adapterKey, yearFormat),
  }).filter((x) => x.className.includes('yearButton'))[0]

  fireEvent.click(prevYearElement)

  const monthElement = getByRole('button', {
    name: getFormatDateString(expectedDate, adapterKey, 'monthShort'),
  })

  fireEvent.click(monthElement)

  const dateElement = getAllByRole('button', {
    name: String(expectedDate.getDate()),
  }).filter((x) => !x.className.includes('notInMonth'))[0]

  fireEvent.click(dateElement)

  expect(onChange).toHaveBeenLastCalledWith([expectedDate, null])
})
