import * as React from 'react'
import { render } from '@testing-library/react'
import { light } from '@v-uik/theme'
import { Accordion } from '../src'

it('renders correctly', () => {
  const { getByTestId } = render(<Accordion data-testid="testId" />)
  expect(getByTestId('testId')).toBeInTheDocument()
})

it('add bottom border', () => {
  const { getByTestId } = render(<Accordion data-testid="testId" />)
  expect(window.getComputedStyle(getByTestId('testId'))['borderBottom']).toBe(
    `1px solid ${light.comp.accordion.colorBorder}`
  )
})
