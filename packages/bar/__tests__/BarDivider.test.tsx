import * as React from 'react'
import { render } from '@testing-library/react'
import { Bar, BarDivider } from '../src'

it('styled correctly in horizontal bar', () => {
  const { getByTestId } = render(
    <Bar>
      <BarDivider data-testid="testId" />
    </Bar>
  )
  expect(getByTestId('testId')).toHaveStyle({
    width: '1px',
    height: 'auto',
  })
})

it('styled correctly in vertical bar', () => {
  const { getByTestId } = render(
    <Bar direction="vertical">
      <BarDivider data-testid="testId" />
    </Bar>
  )
  expect(getByTestId('testId')).toHaveStyle({
    height: '1px',
  })
})
