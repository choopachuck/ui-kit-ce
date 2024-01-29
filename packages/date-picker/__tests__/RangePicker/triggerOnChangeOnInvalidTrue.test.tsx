import * as React from 'react'
import { render } from '@testing-library/react'
import { adapterKeys } from '../withDateLibAdapter'
import { Component } from './utils'

import '../../src/hooks/useMobileView'
import userEvent from '@testing-library/user-event'
jest.mock('../../src/hooks/useMobileView', () => ({
  useMobileView: () => false,
}))

it.each(adapterKeys)(
  '[Adapter: %s] triggerOnChangeOnInvalid = true',
  (adapterKey) => {
    const currentDate = new Date()
    const onChange = jest.fn()
    const { getAllByRole } = render(
      <Component
        triggerOnChangeOnInvalid
        format="dd.MM.yyyy"
        adapterKey={adapterKey}
        minDate={currentDate}
        onChange={onChange}
      />
    )

    const input = getAllByRole('textbox')[0]
    input.focus()
    userEvent.keyboard('21022022')

    expect(onChange).toHaveBeenCalled()
  }
)
