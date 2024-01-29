import * as React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { adapterKeys } from '../withDateLibAdapter'
import { Component } from './utils'

import '../../src/hooks/useMobileView'
jest.mock('../../src/hooks/useMobileView', () => ({
  useMobileView: () => false,
}))

it.each(adapterKeys)(
  '[Adapter: %s] triggerOnChangeOnInvalid = false',
  (adapterKey) => {
    const currentDate = new Date()
    const onChange = jest.fn()
    const { getAllByRole } = render(
      <Component
        format="dd.MM.yyyy"
        adapterKey={adapterKey}
        minDate={currentDate}
        onChange={onChange}
      />
    )

    const input = getAllByRole('textbox')[0]
    fireEvent.change(input, { target: { value: '21.02.2002' } })

    expect(onChange).not.toHaveBeenCalled()
  }
)
