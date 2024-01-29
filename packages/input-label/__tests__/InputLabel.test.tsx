import * as React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { InputLabel } from '../src'

it('apply disabled styles', () => {
  const { getByTestId, rerender } = render(
    <InputLabel data-testid="testId">label</InputLabel>
  )
  expect(getByTestId('testId').className).not.toMatch(/disabled/i)
  rerender(
    <InputLabel disabled data-testid="testId">
      label
    </InputLabel>
  )
  expect(getByTestId('testId').className).toMatch(/disabled/i)
})

it('render tooltip icon', () => {
  const { rerender } = render(<InputLabel>label</InputLabel>)
  expect(document.querySelector('svg')).not.toBeInTheDocument()
  rerender(<InputLabel tooltipText="tooltip">label</InputLabel>)
  expect(document.querySelector('svg')).toBeInTheDocument()
})

it('show tooltip on hover', async () => {
  const { queryByText, findByText } = render(
    <InputLabel tooltipText="tooltip">label</InputLabel>
  )
  expect(queryByText('tooltip')).not.toBeInTheDocument()
  fireEvent.mouseEnter(document.querySelector('svg') as SVGSVGElement)
  const tooltip = await findByText('tooltip')
  expect(tooltip).toBeInTheDocument()
})
