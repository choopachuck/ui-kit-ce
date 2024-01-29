import * as React from 'react'
import { render } from '@testing-library/react'
import { Badge } from '../src'

it('renders correctly', () => {
  const { getByText } = render(<Badge content="content" />)
  expect(getByText('content')).toBeInTheDocument()
})

it('provide position classes correctly', () => {
  const positionClasses = {
    top: 'top',
    bottom: 'bottom',
    left: 'left',
    right: 'right',
  }
  const { getByText, rerender } = render(
    <Badge position="top-left" content={5} classes={positionClasses} />
  )
  let badge = getByText('5')
  expect(badge).toHaveClass('top')
  expect(badge).not.toHaveClass('bottom')
  expect(badge).toHaveClass('left')
  expect(badge).not.toHaveClass('right')
  rerender(
    <Badge position="bottom-right" content={5} classes={positionClasses} />
  )
  badge = getByText('5')
  expect(badge).not.toHaveClass('top')
  expect(badge).toHaveClass('bottom')
  expect(badge).not.toHaveClass('left')
  expect(badge).toHaveClass('right')
})

it("doesn't render content in dot mode", () => {
  const { queryByText } = render(<Badge dot content={5} />)
  expect(queryByText('5')).not.toBeInTheDocument()
})

it('shows max value when overflow', () => {
  const { getByText, rerender } = render(<Badge max={10} content={10} />)
  expect(getByText('10')).toBeInTheDocument()
  rerender(<Badge max={10} content={11} />)
  expect(getByText('10+')).toBeInTheDocument()
})
