import * as React from 'react'
import { render } from '@testing-library/react'
import { Divider, TextAlign } from '../src'
import { Direction } from '@v-uik/common'

it('render component with correct role', () => {
  const { getByRole } = render(<Divider />)

  expect(getByRole('separator')).toBeInTheDocument()
})

it.each([TextAlign.left, TextAlign.center, TextAlign.right] as const)(
  'render textAlign correctly',
  (align) => {
    const { getByRole } = render(<Divider textAlign={align} />)

    const divider = getByRole('separator')

    expect(divider.className).toMatch(align)
  }
)

it.each([Direction.horizontal, Direction.vertical] as const)(
  'render direction correctly',
  (direction) => {
    const { getByRole } = render(<Divider direction={direction} />)

    const divider = getByRole('separator')

    expect(divider.className).toMatch(direction)
  }
)
