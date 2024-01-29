import * as React from 'react'
import { render } from '@testing-library/react'
import { TickLabel } from '../src/components/TickLabel'

it('render tick label with text', () => {
  const text = 'test text'
  const { getByText } = render(<TickLabel>{text}</TickLabel>)
  const label = getByText(text)

  expect(label).toBeInTheDocument()
})

it('render tick label with left offset', () => {
  const { getByText, rerender } = render(<TickLabel>test</TickLabel>)
  const label = getByText('test')

  expect(getComputedStyle(label).left).toBe('')

  rerender(<TickLabel value={50}>test</TickLabel>)

  expect(getComputedStyle(label).left).toBe('50%')
})
