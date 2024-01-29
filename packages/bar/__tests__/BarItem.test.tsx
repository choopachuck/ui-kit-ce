import * as React from 'react'
import { render } from '@testing-library/react'
import { BarItem } from '../src'

it('render text', () => {
  const { getByText } = render(<BarItem>text</BarItem>)
  expect(getByText('text')).toBeInTheDocument()
})

it('render icon', () => {
  const { getByText } = render(<BarItem icon="icon">text</BarItem>)
  expect(getByText('icon')).toBeInTheDocument()
})

it('add icon spacing correctly', () => {
  const { getByText, rerender } = render(<BarItem icon="icon">1</BarItem>)
  expect(getByText('icon')).toHaveStyle('margin-right: 8px')
  rerender(<BarItem icon="icon" />)
  expect(getByText('icon')).toHaveStyle('margin-right: 0px')
})
