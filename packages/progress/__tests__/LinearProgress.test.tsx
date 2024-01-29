import * as React from 'react'
import { render } from '@testing-library/react'
import { LinearProgress, ProgressSizeProps } from '../src'

it.each(['sm', 'md', 'lg'])('render progress with size prop', (size) => {
  const { getByTestId } = render(
    <LinearProgress
      data-testid="linear"
      size={size as Exclude<ProgressSizeProps, 'xlg'>}
    />
  )

  expect(getByTestId('linear').className).toMatch(size)
})

it('renders as indeterminate when no value is passed', () => {
  const { getByRole } = render(<LinearProgress />)

  const bar = getByRole('progressbar')

  expect(bar.getAttribute('aria-valuenow')).toBe(null)
  expect(bar.getAttribute('aria-valuemax')).toBe(null)
  expect(bar.getAttribute('aria-valuemin')).toBe(null)

  expect(bar.className).toMatch(/indeterminate/i)
})

it('sets aria-valuenow correctly', () => {
  const value = 42
  const { getByRole } = render(<LinearProgress value={value} />)

  const bar = getByRole('progressbar')

  expect(bar.getAttribute('aria-valuenow')).toBe(value.toString())
})

it('sets aria-valuemax correctly', () => {
  const max = 84
  const { getByRole } = render(<LinearProgress max={max} value={0} />)

  const bar = getByRole('progressbar')

  expect(bar.getAttribute('aria-valuemax')).toBe(max.toString())
})

it('limits value to max', () => {
  const value = 200
  const max = 50
  const { getByRole } = render(<LinearProgress max={max} value={value} />)

  const bar = getByRole('progressbar')

  expect(bar.getAttribute('aria-valuenow')).toBe(max.toString())
})

it('ensures a positive value', () => {
  const value = -10
  const { getByRole } = render(<LinearProgress value={value} />)

  const bar = getByRole('progressbar')

  expect(bar.getAttribute('aria-valuenow')).toBe('0')
})

it('scale changes depending on value', () => {
  const value = 84
  const { getByRole } = render(<LinearProgress value={value} />)

  const track = getByRole('img', { name: 'track' })

  expect(track).toHaveStyle(`width: 84%`)
})

it('the color parameter is passed and set on indeterminate progress', () => {
  const color = '#11f25c'
  const { getByRole } = render(<LinearProgress color={color} />)

  const progress = getByRole('progressbar')

  expect(progress).toHaveStyle(
    `backgroundImage: linear-gradient(90deg, ${color} 12.5%, transparent 12.5%)`
  )
})

it('the color parameter is passed and set on determinate progress', () => {
  const value = 55
  const color = '#11f25c'
  const { getByRole } = render(<LinearProgress color={color} value={value} />)

  const track = getByRole('img', { name: 'track' })

  expect(track).toHaveStyle(`backgroundColor: ${color}`)
})
